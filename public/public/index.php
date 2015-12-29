<?php

require_once('/home/dev/public/HTX/environment.php');

/*
    [base_dir] => /home/dev/public/HTX/HolidayTaxisData
    [lib_dir] => /home/dev/public/HTX/lib
    [web_dir] => /home/tomh/development/cxe/
*/

// Include config
require_once($_SERVER['web_dir'] . 'conf/config.php');
require_once("{$GLOBALS['config']['app_includes']}/db.php");
require_once('Cache/Lite.php');

spl_autoload_register('htx_public_autoloader');
//session_start();
Define('CONFIG_APPLICATION', 'public');

// Returning from WorldPay PayPal - need to get session id and booking ref
if ($_REQUEST['paypal_success'])
{
	$paypal_params = explode('|', $_REQUEST['paypal_success']);
	$_REQUEST['booking_ref'] = $paypal_params[0];
	$session_id = $paypal_params[1];
}

HTX_Session::start('PHPSESSID', (($session_id) ? $session_id : null), true, 'mobile_site');


$affiliateModel = new Public_Model_Affiliates();
$affiliateModel->setAffiliate();
$affiliateModel->setPartner();
$affiliateModel->setAffStyleScript(); // used to set the new landing page bool
$applicationModel = new Public_Model_Application();
$generalModel = new Public_Model_General();
$currencyModel = new Public_Model_Currency();
$langModel = new Public_Model_Language();

if($_REQUEST['hide_header'])
{
	$applicationModel->set('hide_header', 1);
}
if(isset($_REQUEST['hide_header']) &&  $_REQUEST['hide_header'] == false)
{
	$applicationModel->set('hide_header', null);
}
if($_REQUEST['seo_debug'])
{
	$applicationModel->set('seo_debug', 1);
}
if(isset($_REQUEST['seo_debug']) &&  $_REQUEST['seo_debug'] == false)
{
	$applicationModel->set('seo_debug', null);
}

if(isset($_GET['currency']))
{
	$currencyModel->setCurrency($_GET['currency']);
}

if(isset($_GET['promocode']))
{
	$generalModel->setPromocode($_GET['promocode']);
}

handle_path_name();

$msg = new Public_Model_Messages();

/* load content */
// build page content from controller and action,
// then assign it to a variable and clear everything from the output buffer.
ob_start();
content();
$page_content = ob_get_clean();

$application = $applicationModel->getApplication();

$metaModel = new Public_Model_Meta($application, $msg);

/* Load Layout */

if($_REQUEST['ajax'] || $_REQUEST['controller'] == 'ajax' || $GLOBALS['disable_layout'])
{
	echo $page_content;
}
else if(file_exists($_SERVER['web_dir'] . 'public/layouts/' . strtolower($applicationModel->get('affiliate_code')) . '.phtml'))
{
	require_once($_SERVER['web_dir'] . 'public/layouts/' . strtolower($applicationModel->get('affiliate_code')) . '.phtml');
}
else if(file_exists($_SERVER['web_dir'] . 'public/layouts/' . strtolower($applicationModel->get('base_affiliate_code')) . '.phtml'))
{
	require_once($_SERVER['web_dir'] . 'public/layouts/' . strtolower($applicationModel->get('base_affiliate_code')) . '.phtml');
}
else if(file_exists($_SERVER['web_dir'] . 'public/layouts/' . strtolower($applicationModel->get('default_layout')) . '.phtml'))
{
	require_once($_SERVER['web_dir'] . 'public/layouts/' . strtolower($applicationModel->get('default_layout')) . '.phtml');
}
else
{
	require_once($_SERVER['web_dir'] . 'public/layouts/htx.phtml');
}


function htx_public_autoloader($class_name)
{
	if($class_name == 'Mobile_Detect')
	{
		require_once($_SERVER['web_dir'] . "public/library/MobileDetect/{$class_name}.php");
	}
	elseif(strpos($class_name,'Public_') === 0)
	{
		$class_name = substr($class_name, 7);

		if (strpos($class_name,'Model_') === 0)
		{
			$class_name = substr($class_name, 6);
							
			if (file_exists($_SERVER['web_dir'] . "public/models/{$class_name}.php"))
			{
				require_once($_SERVER['web_dir'] . "public/models/{$class_name}.php");
			}
		}
		else if (strpos($class_name,'Controller_') === 0)
		{
			$class_name = substr($class_name, 11);
			if (file_exists($_SERVER['web_dir'] . "public/controllers/{$class_name}Controller.php"))
			{
				require_once($_SERVER['web_dir'] . "public/controllers/{$class_name}Controller.php");
			}
		}
	}
	else if (file_exists($GLOBALS['config']['app_includes'] . "/classes/{$class_name}.php"))
	{
		require_once($GLOBALS['config']['app_includes'] . "/classes/{$class_name}.php");
	}		
}

function handle_path_name()
{
	global $applicationModel, $affiliateModel, $generalModel, $langModel;

	/* handle the path name */
	$parts = explode('/', trim($_REQUEST['path'], '/'));

	// i'm only going to accept uri's in the form /lang/controller/action/key/value/key/value/?query_string
	//if they're not then i'm going to force the view script to the en version.

	$lang = $langModel->detectLang();
		
	// match language code
	if(preg_match('/^(\w{2})$/', $parts[0], $langs))
	{				
		$lang = $langs[1];

		$params_index = 1;
		$langModel->setLanguage($lang);
	}
	else
	{
		$params_index = 0;
	}		

	if(count($parts) === 1 && $parts[0] == 'index.php')
	{
		header('Location: https://'.$_SERVER['HTTP_HOST'].'/' . $lang . '/');
		exit;
	}

	$_controller_name = 'Public_Controller_Index';
	$_REQUEST['controller'] = 'index';
	$_REQUEST['action'] = 'index';


		
	//Check for translated controller
	if($lang != 'en' && $parts[$params_index] && !in_array(strtolower($parts[$params_index]), array('index', 'ajax')))
	{
		$controllerEn = Public_Model_Route::checkRouteName(
			Array(
				'lang'       => $lang,
				'route_name' => $parts[$params_index],
				'route_type' => 'controller'
			)
		);

									

		if(!$controllerEn)
		{
			$parts[$params_index] = 'index';
		}
		else 
		{
			$parts[$params_index] = $controllerEn;
		}

	}

		
						

	// check for controller
	if(preg_match('/^(\w+)$/', $parts[$params_index]))
	{										
		if(class_exists( 'Public_Controller_' . ucfirst(strtolower($parts[$params_index]))))
		{
			$_REQUEST['controller'] = strtolower($parts[$params_index]);
			$_controller_name = 'Public_Controller_' . ucfirst($_REQUEST['controller']);
			$params_index++;
		}
	}
	// EXCEPTION FOR RESORTS LANDING PAGE - send to search page
	// e.g 	/en/airport-transfers/costa-blanca-alicante-airport/benidorm/
	//	Array
	//	(
	//	    [0] => en
	//	    [1] => airport-transfers
	//	    [2] => costa-blanca-alicante-airport
	//	    [3] => benidorm
	//	)
	else if(strtolower($parts[$params_index]) == 'airport-transfers')
	{
		$_REQUEST['controller'] = 'transfers';
		$_controller_name = 'Public_Controller_Transfers';			
		
		//airport group page
		if(isset($parts[$params_index + 1]))
		{
			$_REQUEST['airportgroupname'] = $parts[$params_index + 1];
				
			$_REQUEST['airport_group_landing_page'] = 1;
			$params_index++;
		}									

		//airport landing page
		if(isset($parts[$params_index + 1]))
		{
			unset($_REQUEST['airport_group_landing_page']);
			$_REQUEST['airportname'] = $parts[$params_index + 1];
			$_REQUEST['airport_landing_page'] = 1;
			$params_index++;
		}

		//route page
		if(isset($parts[$params_index]) && isset($parts[$params_index + 1]))
		{
			unset($_REQUEST['airport_landing_page']);
			$_REQUEST['controller'] = 'search';
			$_REQUEST['airportname'] = $parts[$params_index];
			$_REQUEST['resortname'] = $parts[$params_index + 1];
			$_REQUEST['resort_landing_page'] = 1;
			$_controller_name = 'Public_Controller_Search';
			$params_index++;
		}
	}

		
	if(preg_match('/^(\w+)$/', $parts[$params_index]))
	{
		//Check for translated controller
		if($lang!= 'en' && strtolower($parts[$params_index]) != 'index' && $_REQUEST['controller'] != 'ajax')
		{
			$actionEn = Public_Model_Route::checkRouteName(
				Array(
					'lang'       => $lang,
					'route_name' => $parts[$params_index],
					'route_type' => 'action'
				)
			);

			if(!$actionEn)
			{
				$parts[$params_index] = 'index';
			}
			else
			{
				$parts[$params_index] = $actionEn;
			}

		}

		//check for action
		if(in_array(strtolower($parts[$params_index]) . 'Action', get_class_methods($_controller_name)))
		{
			$_REQUEST['action'] = strtolower($parts[$params_index]);
			$params_index++;
		}
		else if(in_array('indexAction', get_class_methods($_controller_name)))
		{
			$_REQUEST['action'] = 'index';
		}
		// else use /index/index
		else
		{
			$_REQUEST['controller'] = 'index';
			$_REQUEST['action'] = 'index';
		}
	}

		

	for($i = $params_index; $i < count($parts); $i++)
	{
		if($key)
		{
			if(in_array(strtolower($key),array('controller','action')))
			{
				$_REQUEST[$key . '1'] = $parts[$i];
			}
			else
			{
				$_REQUEST[$key] = $parts[$i];
			}
			unset($key);
		}
		else
		{
			$key = $parts[$i];
		}
	}
	if($key)
	{
		$_REQUEST[$key] = '';
		unset($key);
	}
}

function includeViewScript($controller, $action, $params)
{
	global $msg, $application;

	$controller = strtolower($controller);
	$action = strtolower($action);

	$config = $GLOBALS['config'];
	$application = Public_Model_Application::getApplication();

	if($_REQUEST['controller'] == 'ajax')
	{
		// do nothing :)
	}
	else if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['affiliate_code']).'/' . $controller . '/' . $action . '.phtml'))
	{
		require_once($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['affiliate_code']).'/' . $controller . '/' . $action . '.phtml');
	}
	else if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['base_affiliate_code']).'/' . $controller . '/' . $action . '.phtml'))
	{
		require_once($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['base_affiliate_code']).'/' . $controller . '/' . $action . '.phtml');
	}
	else if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['default_layout']).'/' . $controller . '/' . $action . '.phtml'))
	{
		require_once($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['default_layout']).'/' . $controller . '/' . $action . '.phtml');
	}
	else if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/htx/' . $controller . '/' . $action . '.phtml'))
	{
		require_once($_SERVER['web_dir'] . 'public/views/affiliates/htx/' . $controller . '/' . $action . '.phtml');
	}
	else
	{
		trigger_error("View script for Controller: '" . $controller . "' Action: '" . $action . "' does not exist. Error thrown " , E_USER_NOTICE);
	}
}

function include_view($file_path, $params = null)
{
	global $msg, $application;

	$controller = strtolower($controller);
	$action = strtolower($action);
	$application = Public_Model_Application::getApplication();

	$config = $GLOBALS['config'];
	
	if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['affiliate_code']).'/' . $controller . '/' . $action . '.phtml'))
	{
		require($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['affiliate_code']).'/' . $controller . '/' . $action . '.phtml');
	}
	else if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['base_affiliate_code']).'/' . $controller . '/' . $action . '.phtml'))
	{
		require($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['base_affiliate_code']).'/' . $controller . '/' . $action . '.phtml');
	}
	else if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['default_layout']).'/' . $controller . '/' . $action . '.phtml'))
	{
		require($_SERVER['web_dir'] . 'public/views/affiliates/'.strtolower($application['default_layout']).'/' . $controller . '/' . $action . '.phtml');
	}
	if(file_exists($_SERVER['web_dir'] . 'public/views/affiliates/htx/' . strtolower($file_path)))
	{
		require($_SERVER['web_dir'] . 'public/views/affiliates/htx/' . strtolower($file_path));
	}
}


/*
* this is the function to generate the page specific content, it is called in the layout.
*/
function content()
{
	if($_REQUEST['controller'])
	{
		if(class_exists('Public_Controller_' . ucfirst(strtolower($_REQUEST['controller']))))
		{
			$_controller_name = 'Public_Controller_' . ucfirst(strtolower($_REQUEST['controller']));
			$_action_name = (($_REQUEST['action']) ? $_REQUEST['action'] : strtolower('index')) . 'Action';
			$_controller = new $_controller_name();

			if(method_exists($_controller, $_action_name) )
			{
				$_controller->$_action_name();

				if(!$_controller->_is_viewscript_disabled())
				{
					includeViewScript($_REQUEST['controller'],$_REQUEST['action'], $_controller->_get_view_params());
				}
				if($_controller->_is_layout_disabled())
				{
					$GLOBALS['disable_layout'] = 1;
				}
			}
			else
			{
				trigger_error("The Action '" . $_REQUEST['action'] . "' does not exist in Controller '" . $_REQUEST['controller'] . "'. Error thrown " , E_USER_NOTICE);
			}
		}
		else
		{
			trigger_error("Controller '" . ucfirst(strtolower($_REQUEST['controller'])) . '" does not exist. Error thrown ' , E_USER_NOTICE);
		}
	}
	else
	{
		$_controller = new Public_Controller_Index();
		$_controller->indexAction();
		includeViewScript('index','index');
	}
}

function auto_version($scriptname)
{
	$patch_number = '';
	$pattern = '/(css|js|scripts)\/(.+)\.(css|js)$/';
	$replacement = '$1/'.$GLOBALS['config']['web_version'] . $patch_number .'/$2.$3';

	return preg_replace($pattern,$replacement,$scriptname);
}

    window.olark || (function(c) { 
                                var f = window,
                                    d = document,
                                    l = f.location.protocol == "https:" ? "https:" : "http:",
                                    z = c.name,
                                    r = "load";
                                var nt = function() {
                                    f[z] = function() {
                                        (a.s = a.s || []).push(arguments)
                                    };
                                    var a = f[z]._ = {},
                                        q = c.methods.length;
                                    while (q--) {
                                        (function(n) {
                                            f[z][n] = function() {
                                                f[z]("call", n, arguments)
                                            }
                                        })(c.methods[q])
                                    }
                                    a.l = c.loader;
                                    a.i = nt;
                                    a.p = {
                                        0: +new Date
                                    };
                                    a.P = function(u) {
                                        a.p[u] = new Date - a.p[0]
                                    };

                                    function s() {
                                        a.P(r);
                                        f[z](r)
                                    }
                                    f.addEventListener ? f.addEventListener(r, s, false) : f.attachEvent("on" + r, s);
                                    var ld = function() {
                                        function p(hd) {
                                            hd = "head";
                                            return ["<", hd, "></", hd, "><", i, ' onl' + 'oad="var d=', g, ";d.getElementsByTagName('head')[0].", j, "(d.", h, "('script')).", k, "='", l, "//", a.l, "'", '"', "></", i, ">"].join("")
                                        }
                                        var i = "body",
                                            m = d[i];
                                        if (!m) {
                                            return setTimeout(ld, 100)
                                        }
                                        a.P(1);
                                        var j = "appendChild",
                                            h = "createElement",
                                            k = "src",
                                            n = d[h]("div"),
                                            v = n[j](d[h](z)),
                                            b = d[h]("iframe"),
                                            g = "document",
                                            e = "domain",
                                            o;
                                        n.style.display = "none";
                                        m.insertBefore(n, m.firstChild).id = z;
                                        b.frameBorder = "0";
                                        b.id = z + "-loader";
                                        if (/MSIE[ ]+6/.test(navigator.userAgent)) {
                                            b.src = "javascript:false"
                                        }
                                        b.allowTransparency = "true";
                                        v[j](b);
                                        try {
                                            b.contentWindow[g].open()
                                        } catch (w) {
                                            c[e] = d[e];
                                            o = "javascript:var d=" + g + ".open();d.domain='" + d.domain + "';";
                                            b[k] = o + "void(0);"
                                        }
                                        try {
                                            var t = b.contentWindow[g];
                                            t.write(p());
                                            t.close()
                                        } catch (x) {
                                            b[k] = o + 'd.write("' + p().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
                                        }
                                        a.P(2)
                                    };
                                    ld()
                                };
                                nt()
                            })({
                                loader: "static.olark.com/jsclient/loader0.js",
                                name: "olark",
                                methods: ["configure", "extend", "declare", "identify"]
                            });
			    
				olark.identify(OLARK_ADDRESS); 
				olark.configure('locale.welcome_title',  OLARK_WELCOME);
				olark.configure('locale.chatting_title', OLARCK_CHATTING_TITLE);
				olark.configure('locale.unavailable_title', OLARCK_CHAT_OFFLINE);
				olark.configure('locale.busy_title', OLARCK_CHAT_BUSY);
				olark.configure('locale.away_message',  OLARCK_AWAY_MESSAGE);
				olark.configure('locale.loading_title',  OLARCK_LOADING_TITLE);
				olark.configure('locale.welcome_message', OLARCK_WELCOME_MSG);
				olark.configure('locale.busy_message', OLARCK_BUSY_MESSAGE);
				olark.configure('locale.chat_input_text', OLARCK_INPUT_CHAT);
				olark.configure('locale.offline_note_message', OLARCK_NOTE_MESSAGE);
				olark.configure('locale.offline_note_thankyou_text', OLARCK_THANKYOU);
				olark.configure('locale.offline_note_sending_text', OLARCK_SENDING);
				olark.configure('locale.operator_is_typing_text',  OLARCK_IS_TYPING);
				olark.configure('locale.name_input_text',  OLARCK_INPUT_NAME);
				olark.configure('locale.email_input_text',  OLARCK_INPUT_EMAIL);
				olark.configure('locale.operator_has_stopped_typing_text', OLARCK_HAS_STOPPED);
				olark.configure('locale.introduction_submit_button_text', OLARCK_INTRODUCTION_SUBMIT_TEXT);
				olark.configure('locale.disabled_input_text_when_convo_has_ended', OLARCK_PANEL_CONVO_HAS_END);
				olark.configure('locale.send_button_text', OLARCK_BUTTON_TEXT);
				olark.configure('locale.offline_note_error_text', OLARCK_NOTE_ERROR_TEXT);
				olark.configure('locale.introduction_error_text', OLARCK_INTRODUCTION_ERROR);
				olark.configure('locale.introduction_messages', OLARCK_INTRODUCTION_MESSAGE);
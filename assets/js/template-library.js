! function(d, c) {
    window.paw = window.paw || {}, paw.translate = function(e, t) {
        return elementorCommon.translate(e, null, t, ThemepawAddonsEditor.i18n)
    };
    var m = {
        LibraryViews: {},
        LibraryModels: {},
        LibraryCollections: {},
        LibraryBehaviors: {},
        LibraryLayout: null,
        LibraryManager: null
    };
    m.LibraryModels.Template = Backbone.Model.extend({
        defaults: {
            template_id: 0,
            title: "",
            type: "",
            thumbnail: "",
            url: "",
            isPro: !1,
            category: []
        }
    }), m.LibraryCollections.Template = Backbone.Collection.extend({
        model: m.LibraryModels.Template
    }), m.LibraryBehaviors.InsertTemplate = Marionette.Behavior.extend({
        ui: {
            insertButton: ".paw-templateLibrary-insert-button"
        },
        events: {
            "click @ui.insertButton": "onInsertButtonClick"
        },
        onInsertButtonClick: function() {
            paw.library.insertTemplate({
                model: this.view.model
            })
        }
    }), m.LibraryViews.Loading = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-loading",
        id: "paw-templateLibrary-loading"
    }), m.LibraryViews.Logo = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-header-logo",
        className: "paw-templateLibrary-header-logo",
        templateHelpers: function() {
            return {
                title: this.getOption("title")
            }
        }
    }), m.LibraryViews.BackButton = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-header-back",
        id: "elementor-template-library-header-preview-back",
        className: "paw-templateLibrary-header-back",
        events: function() {
            return {
                click: "onClick"
            }
        },
        onClick: function() {
            paw.library.showTemplatesView()
        }
    }), m.LibraryViews.Menu = Marionette.ItemView.extend({
        template: "#template-paw-TemplateLibrary_header-menu",
        id: "elementor-template-library-header-menu",
        className: "paw-TemplateLibrary_header-menu",
        templateHelpers: function() {
            return paw.library.getTabs()
        },
        ui: {
            menuItem: ".elementor-template-library-menu-item"
        },
        events: {
            "click @ui.menuItem": "onMenuItemClick"
        },
        onMenuItemClick: function(e) {
            paw.library.setFilter("category", ""), paw.library.setFilter("text", ""), paw.library.setFilter("type", e.currentTarget.dataset.tab, !0), paw.library.showTemplatesView()
        }
    }), m.LibraryViews.EmptyTemplateCollection = Marionette.ItemView.extend({
        id: "elementor-template-library-templates-empty",
        template: "#template-paw-templateLibrary-empty",
        ui: {
            title: ".elementor-template-library-blank-title",
            message: ".elementor-template-library-blank-message"
        },
        modesStrings: {
            empty: {
                title: paw.translate("templatesEmptyTitle"),
                message: paw.translate("templatesEmptyMessage")
            },
            noResults: {
                title: paw.translate("templatesNoResultsTitle"),
                message: paw.translate("templatesNoResultsMessage")
            }
        },
        getCurrentMode: function() {
            return paw.library.getFilter("text") ? "noResults" : "empty"
        },
        onRender: function() {
            var e = this.modesStrings[this.getCurrentMode()];
            this.ui.title.html(e.title), this.ui.message.html(e.message)
        }
    }), m.LibraryViews.Actions = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-header-actions",
        id: "elementor-template-library-header-actions",
        ui: {
            sync: "#paw-templateLibrary-header-sync i"
        },
        events: {
            "click @ui.sync": "onSyncClick"
        },
        onSyncClick: function() {
            var e = this;
            e.ui.sync.addClass("eicon-animation-spin"), paw.library.requestLibraryData({
                onUpdate: function() {
                    e.ui.sync.removeClass("eicon-animation-spin"), paw.library.updateBlocksView()
                },
                forceUpdate: !0,
                forceSync: !0
            })
        }
    }), m.LibraryViews.InsertWrapper = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-header-insert",
        id: "elementor-template-library-header-preview",
        behaviors: {
            insertTemplate: {
                behaviorClass: m.LibraryBehaviors.InsertTemplate
            }
        }
    }), m.LibraryViews.Preview = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-preview",
        className: "paw-templateLibrary-preview",
        ui: function() {
            return {
                iframe: "> iframe"
            }
        },
        onRender: function() {
            this.ui.iframe.attr("src", this.getOption("url")).hide();
            var e = this,
                t = (new m.LibraryViews.Loading).render();
            this.$el.append(t.el), this.ui.iframe.on("load", function() {
                e.$el.find("#paw-templateLibrary-loading").remove(), e.ui.iframe.show()
            })
        }
    }), m.LibraryViews.TemplateCollection = Marionette.CompositeView.extend({
        template: "#template-paw-templateLibrary-templates",
        id: "paw-templateLibrary-templates",
        childViewContainer: "#paw-templateLibrary-templates-list",
        emptyView: function() {
            return new m.LibraryViews.EmptyTemplateCollection
        },
        ui: {
            templatesWindow: ".paw-templateLibrary-templates-window",
            textFilter: "#paw-templateLibrary-search",
            categoryFilter: "#paw-templateLibrary-filter-category",
            filterBar: "#paw-templateLibrary-toolbar-filter"
        },
        events: {
            "input @ui.textFilter": "onTextFilterInput",
            "change @ui.categoryFilter": "onCategoryFilterClick"
        },
        getChildView: function(e) {
            return m.LibraryViews.Template
        },
        initialize: function() {
            this.listenTo(paw.library.channels.templates, "filter:change", this._renderChildren)
        },
        filter: function(a) {
            var e = paw.library.getFilterTerms(),
                i = !0;
            return _.each(e, function(e, t) {
                t = paw.library.getFilter(t);
                if (t && e.callback) {
                    t = e.callback.call(a, t);
                    return t || (i = !1), t
                }
            }), i
        },
        setMasonrySkin: function() {
            var e = new elementorModules.utils.Masonry({
                container: this.$childViewContainer,
                items: this.$childViewContainer.children()
            });
            this.$childViewContainer.imagesLoaded(e.run.bind(e))
        },
        onRenderCollection: function() {
            this.setMasonrySkin(), this.updatePerfectScrollbar()
        },
        onTextFilterInput: function() {
            var e = this;
            _.defer(function() {
                paw.library.setFilter("text", e.ui.textFilter.val())
            })
        },
        onCategoryFilterClick: function(e) {
            e = e.currentTarget.selectedOptions[0].value;
            paw.library.setFilter("category", e)
        },
        updatePerfectScrollbar: function() {
            this.perfectScrollbar || (this.perfectScrollbar = new PerfectScrollbar(this.ui.templatesWindow[0], {
                suppressScrollX: !0
            })), this.perfectScrollbar.isRtl = !1, this.perfectScrollbar.update()
        },
        onRender: function() {
            this.$("#paw-templateLibrary-filter-category").select2({
                placeholder: "Filter",
                allowClear: !0,
                width: 200
            }), this.updatePerfectScrollbar()
        }
    }), m.LibraryViews.Template = Marionette.ItemView.extend({
        template: "#template-paw-templateLibrary-template",
        className: "paw-templateLibrary-template",
        ui: {
            previewButton: ".paw-templateLibrary-preview-button, .paw-templateLibrary-template-preview"
        },
        events: {
            "click @ui.previewButton": "onPreviewButtonClick"
        },
        behaviors: {
            insertTemplate: {
                behaviorClass: m.LibraryBehaviors.InsertTemplate
            }
        },
        onPreviewButtonClick: function() {
            paw.library.showPreviewView(this.model)
        }
    }), m.Modal = elementorModules.common.views.modal.Layout.extend({
        getModalOptions: function() {
            return {
                id: "pawTemplateLibraryModal",
                hide: {
                    onOutsideClick: !1,
                    onEscKeyPress: !0,
                    onBackgroundClick: !1
                }
            }
        },
        getTemplateActionButton: function(e) {
            e = e.isPro && !ThemepawAddonsEditor.isProActive ? "pro-button" : "insert-button";
            return viewId = "#template-paw-templateLibrary-" + e, template = Marionette.TemplateCache.get(viewId), Marionette.Renderer.render(template)
        },
        showLogo: function(e) {
            this.getHeaderView().logoArea.show(new m.LibraryViews.Logo(e))
        },
        showDefaultHeader: function() {
            this.showLogo({
                title: "Exclusive Addons"
            });
            var e = this.getHeaderView();
            e.tools.show(new m.LibraryViews.Actions), e.menuArea.show(new m.LibraryViews.Menu)
        },
        showPreviewView: function(e) {
            var t = this.getHeaderView();
            t.logoArea.show(new m.LibraryViews.BackButton), t.tools.show(new m.LibraryViews.InsertWrapper({
                model: e
            })), this.modalContent.show(new m.LibraryViews.Preview({
                url: e.get("url")
            }))
        },
        showBlocksView: function(e) {
            this.modalContent.show(new m.LibraryViews.TemplateCollection({
                collection: e
            }))
        },
        showTemplatesView: function(e) {
            this.showDefaultHeader(), this.modalContent.show(new m.LibraryViews.TemplateCollection({
                collection: e
            }))
        }
    }), m.LibraryManager = function() {
        function r() {
            var e = d(this).closest(".elementor-top-section"),
                a = e.data("id"),
                t = c.documents.getCurrent().container.children,
                e = e.prev(".elementor-add-section");
            t && _.each(t, function(e, t) {
                a === e.cid && (s.atIndex = t)
            }), e.find(".elementor-add-paw-button").length || e.find(FIND_SELECTOR).before($pawLibraryButton)
        }

        function e(e, t) {
            t.addClass("elementor-active").siblings().removeClass("elementor-active")
        }

        function t() {
            var a = window.elementor.$previewContents,
                i = setInterval(function() {
                    var e, t;
                    (t = (e = a).find(FIND_SELECTOR)).length && !e.find(".elementor-add-paw-button").length && t.before($pawLibraryButton), e.on("click.onAddElement", ".elementor-editor-section-settings .elementor-editor-element-add", r), 0 < a.find(".elementor-add-new-section").length && clearInterval(i)
                }, 100);
            a.on("click.onAddTemplateButton", ".elementor-add-paw-button", s.showModal.bind(s)), this.channels.tabs.on("change:device", e)
        }
        var a, i, n, o, l, s = this;
        FIND_SELECTOR = ".elementor-add-new-section .elementor-add-section-drag-title", $pawLibraryButton = '<div class="elementor-add-section-area-button elementor-add-paw-button">&nbsp;</div>', this.atIndex = -1, this.channels = {
            tabs: Backbone.Radio.channel("tabs"),
            templates: Backbone.Radio.channel("templates")
        }, this.updateBlocksView = function() {
            s.setFilter("category", "", !0), s.setFilter("text", "", !0), s.getModal().showTemplatesView(n)
        }, this.setFilter = function(e, t, a) {
            s.channels.templates.reply("filter:" + e, t), a || s.channels.templates.trigger("filter:change")
        }, this.getFilter = function(e) {
            return s.channels.templates.request("filter:" + e)
        }, this.getFilterTerms = function() {
            return {
                category: {
                    callback: function(t) {
                        return _.any(this.get("category"), function(e) {
                            return 0 <= e.indexOf(t)
                        })
                    }
                },
                text: {
                    callback: function(t) {
                        return t = t.toLowerCase(), 0 <= this.get("title").toLowerCase().indexOf(t) || _.any(this.get("category"), function(e) {
                            return 0 <= e.indexOf(t)
                        })
                    }
                },
                type: {
                    callback: function(e) {
                        return this.get("type") === e
                    }
                }
            }
        }, this.showModal = function() {
            s.getModal().showModal(), s.showTemplatesView()
        }, this.closeModal = function() {
            this.getModal().hideModal()
        }, this.getModal = function() {
            return a = a || new m.Modal
        }, this.init = function() {
            s.setFilter("type", "section", !0), c.on("preview:loaded", t.bind(this))
        }, this.getTabs = function() {
            var a = this.getFilter("type");
            return tabs = {
                section: {
                    title: "Blocks"
                },
                page: {
                    title: "Pages"
                }
            }, _.each(tabs, function(e, t) {
                a === t && (tabs[a].active = !0)
            }), {
                tabs: tabs
            }
        }, this.getCategory = function() {
            return i
        }, this.getTypeCategory = function() {
            var e = s.getFilter("type");
            return o[e]
        }, this.showTemplatesView = function() {
            s.setFilter("category", "", !0), s.setFilter("text", "", !0), n ? s.getModal().showTemplatesView(n) : s.loadTemplates(function() {
                s.getModal().showTemplatesView(n)
            })
        }, this.showPreviewView = function(e) {
            s.getModal().showPreviewView(e)
        }, this.loadTemplates = function(e) {
            s.requestLibraryData({
                onBeforeUpdate: s.getModal().showLoadingView.bind(s.getModal()),
                onUpdate: function() {
                    s.getModal().hideLoadingView(), e && e()
                }
            })
        }, this.requestLibraryData = function(t) {
            var e;
            !n || t.forceUpdate ? (t.onBeforeUpdate && t.onBeforeUpdate(), e = {
                data: {},
                success: function(e) {
                    n = new m.LibraryCollections.Template(e.templates), e.category && (i = e.category), e.type_category && (o = e.type_category), t.onUpdate && t.onUpdate()
                }
            }, t.forceSync && (e.data.sync = !0), elementorCommon.ajax.addRequest("paw_get_template_library_data", e)) : t.onUpdate && t.onUpdate()
        }, this.requestTemplateData = function(e, t) {
            e = {
                unique_id: e,
                data: {
                    edit_mode: !0,
                    display: !0,
                    template_id: e
                }
            };
            t && jQuery.extend(!0, e, t), elementorCommon.ajax.addRequest("paw_get_template_item_data", e)
        }, this.insertTemplate = function(e) {
            var a = e.model,
                i = this;
            i.getModal().showLoadingView(), i.requestTemplateData(a.get("template_id"), {
                success: function(e) {
                    i.getModal().hideLoadingView(), i.getModal().hideModal();
                    var t = {}; - 1 !== i.atIndex && (t.at = i.atIndex), $e.run("document/elements/import", {
                        model: a,
                        data: e,
                        options: t
                    }), i.atIndex = -1
                },
                error: function(e) {
                    i.showErrorDialog(e)
                },
                complete: function(e) {
                    i.getModal().hideLoadingView(), window.elementor.$previewContents.find(".elementor-add-section .elementor-add-section-close").click()
                }
            })
        }, this.showErrorDialog = function(e) {
            var t;
            "object" == typeof e ? (t = "", _.each(e, function(e) {
                t += "<div>" + e.message + ".</div>"
            }), e = t) : e ? e += "." : e = "<i>&#60;The error message is empty&#62;</i>", s.getErrorDialog().setMessage('The following error(s) occurred while processing the request:<div id="elementor-template-library-error-info">' + e + "</div>").show()
        }, this.getErrorDialog = function() {
            return l = l || elementorCommon.dialogsLibraryManager.createWidget("alert", {
                id: "elementor-template-library-error-dialog",
                headerMessage: "An error occurred"
            })
        }
    }, window.paw.library = new m.LibraryManager, window.paw.library.init()
}(jQuery, window.elementor);
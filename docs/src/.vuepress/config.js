const {description} = require('../../package.json')

module.exports = {
    base: "/",
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'DigiWF',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,
    /**
     * Output directory
     */
    dest: "dist",
    /**
     * port to run dev server
     */
    port: 8099,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {name: 'theme-color', content: '#333333'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],
    locales: {
        '/': {
            lang: 'de-DE', // this will be set as the lang attribute on <html>
            title: 'DigiWF',
            description: ''
        }
        // '/en/': {
        //     lang: 'en-US', // this will be set as the lang attribute on <html>
        //     title: 'DigiWF',
        //     description: ''
        // }
    },

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: 'https://github.com/it-at-m/digiwf-core',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        locales: {
            '/': {
                selectText: 'Sprachen',
                label: 'Deutsch',
                ariaLabel: 'Sprachen',
                nav: [
                    {
                        text: 'Modellierung',
                        link: '/modeling/'
                    },
                    {
                        text: 'Technische Dokumentation',
                        link: '/documentation/',
                    },
                    {
                        text: 'Integrationen',
                        link: '/integrations/'
                    },
                    {
                        text: 'Release Notes',
                        link: 'https://github.com/it-at-m/digiwf-core/releases'
                    }
                ],
                sidebar: {
                    '/documentation/': [
                        {
                            title: 'Plattform',
                            collapsable: false,
                            children: [
                                '',
                                'roadmap',
                            ]
                        },
                        {
                            title: 'Architektur',
                            collapsable: false,
                            children: [
                                'architecture/overview',
                                'architecture/system-integration',
                                'architecture/json-schema',
                                'architecture/filehandling',
                                'architecture/adrs'
                            ]
                        },
                        {
                            title: 'Komponenten',
                            collapsable: false,
                            children: [
                                'components/engine',
                                'components/connector',
                                'components/tasks',
                                'components/frontend',
                                'components/webcomponents',
                                'components/deployment',
                            ]
                        },
                        {
                            title: 'Guides',
                            collapsable: false,
                            children: [
                                'guides/topics',
                                'guides/technical-setup/',
                                'guides/custom-input-field/',
                                'guides/feature-toggle-taskservice-integration/',
                            ]
                        },
                        {
                            title: 'Bibliotheken',
                            collapsable: false,
                            children: [
                                'libs/digiwf-integration-e2e-test/',
                                'libs/digiwf-message/',
                                'libs/digiwf-spring-security/',
                                'libs/digiwf-email/',
                            ]
                        },
                        {
                            title: 'Feature Prozesse',
                            collapsable: false,
                            children: [
                                'featureprocesses/intro',
                                'featureprocesses/digiwferleben/',
                                'featureprocesses/email/',
                                'featureprocesses/cosys/',

                            ]
                        }
                    ],
                    '/modeling/': [
                        {
                            title: 'Plattform',
                            collapsable: false,
                            children: [
                                '',
                                'plattform/project/',
                                'plattform/artefact/',
                                'plattform/deployment/',
                            ]
                        },
                        {
                            title: 'Prozesse',
                            collapsable: false,
                            children: [
                                'processes/modeling/',
                                'processes/functions/',
                                'processes/authorization/',
                                'processes/config/',
                            ]
                        },
                        {
                            title: 'Benutzeraufgaben',
                            collapsable: false,
                            children: [
                                'user-tasks/modeling/'
                            ]
                        },
                        {
                            title: 'Expressions',
                            collapsable: false,
                            children: [
                                'expressions/basic/',
                                'expressions/functions/',
                            ]
                        },
                        {
                            title: 'Formulare',
                            collapsable: false,
                            children: [
                                'forms/',
                                'forms/fields/',
                                'forms/objects/',
                                'forms/optional-content/',
                                'forms/links/',
                                'forms/accessibility/'
                            ]
                        },
                        {
                            title: 'Wiederverwendbare Bausteine',
                            collapsable: false,
                            children: [
                                'bausteine/',
                                'bausteine/integrationen/',
                            ]
                        },
                        {
                            title: 'Guides',
                            collapsable: false,
                            children: [
                                'guides/modeling-first-process/',
                                'guides/form-v1-auf-v2/',
                                'guides/element-template-migration/',
                            ]
                        },
                        {
                            title: 'Templates und Beispiele',
                            collapsable: true,
                            children: [
                                'templates/bpmn/',
                                'templates/element-templates/',
                                'templates/examples/'
                            ]
                        }
                    ],
                    '/integrations/': [
                        {
                            title: 'Integrationen',
                            collapsable: false,
                            children: [
                                '',
                                'digiwf-address-integration',
                                'digiwf-alw-integration',
                                'digiwf-cosys-integration',
                                'digiwf-mail-integration',
                                'digiwf-s3-integration',
                                'digiwf-formserver-integration',
                                'digiwf-dms-integration',
                                'digiwf-ticket-integration'
                            ]
                        },
                        {
                            title: 'Konzept',
                            collapsable: true,
                            children: [
                                'concept/integration-service',
                                'concept/error-handling',
                            ]
                        },
                        {
                            title: 'Guides',
                            collapsable: true,
                            children: [
                                'guides/custom-integration-service',
                            ]
                        }
                    ],
                }
            },
            '/en/': {
                selectText: 'Languages',
                // label for this locale in the language dropdown
                label: 'English',
                // Aria Label for locale in the dropdown
                ariaLabel: 'Languages',
                nav: [],
                sidebar: {}
            }
        },
    },

    /**
     * markdown extension
     */
    markdown: {
        lineNumbers: true,
        extendMarkdown: md => {
            md.use(require('markdown-it-footnote'))
        }
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
        'vuepress-plugin-mermaidjs'
    ]
}

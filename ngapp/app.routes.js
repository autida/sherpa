angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $ocLazyLoadProvider.config({
            debug: false,
        });
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: COMURL + 'full.html?v=' + VERSION,
            })
            .state('app.main', {
                url: '/',
                templateUrl: APPURL + 'dashboard/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Dashboard',
                },
            })
            .state('app.menu', {
                url: '/add-menu',
                templateUrl: APPURL + 'dashboard/menu.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Developer Settings',
                },
            })
            .state('app.profile', {
                url: '/view-profile',
                templateUrl: COMURL + 'profile/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [COMURL + 'profile/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'View Profile',
                },
            })
            // MASTERFILE
            .state('app.masterfile', {
                abstract: true,
            })
            .state('app.masterfile.member-list', {
                url: '/member-list',
                templateUrl: MASTERURL + 'member_reg/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'member_reg/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Home Owner List',
                    urlGroup: 'Masterfile',
                    formName: 'Home Owner List',
                },
            })
            .state('app.masterfile.renter-list', {
                url: '/renter-list',
                templateUrl: MASTERURL + 'renter/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'renter/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Renter List',
                    urlGroup: 'Masterfile',
                    formName: 'Renter List',
                },
            })
            .state('app.masterfile.other-income', {
                url: '/other-income',
                templateUrl: MASTERURL + 'other_income/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'other_income/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Other Income',
                    urlGroup: 'Masterfile',
                    formName: 'Other Income',
                },
            })
            .state('app.masterfile.chart-of-account', {
                url: '/chart-of-account',
                templateUrl: MASTERURL + 'coa/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'coa/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Chart of Account',
                    urlGroup: 'Masterfile',
                    formName: 'Chart of Account',
                },
            })
            .state('app.masterfile.cashflow', {
                url: '/cashflow',
                templateUrl: MASTERURL + 'cashflow/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'cashflow/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > CashFlow',
                    urlGroup: 'Masterfile',
                    formName: 'CashFlow',
                },
            })
            //ADMINISTRATIVE
            .state('app.administrative', {
                abstract: true,
            })
            .state('app.administrative.user-list', {
                url: '/user-list',
                templateUrl: ADMINURL + 'user_list/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'user_list/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > User List',
                    urlGroup: 'Administrative',
                    formName: 'User List',
                },
            })
            .state('app.administrative.signatory-list', {
                url: '/signatory-list',
                templateUrl: ADMINURL + 'signatory_list/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'signatory_list/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Signatory List',
                    urlGroup: 'Administrative',
                    formName: 'Signatory List',
                },
            })
            .state('app.administrative.or-setup', {
                url: '/or-setup',
                templateUrl: ADMINURL + 'or_setup/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'or_setup/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Official Receipt Series Setup',
                    urlGroup: 'Administrative',
                    formName: 'Official Receipt Series Setup',
                },
            })
            .state('app.administrative.auto-debit-chart-of-account', {
                url: '/auto-debit-chart-of-account',
                templateUrl: ADMINURL + 'tad_coa/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'tad_coa/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Auto Debit Chart of Account',
                    urlGroup: 'Administrative',
                    formName: 'Auto Debit Chart of Account',
                },
            })
            .state('app.administrative.annual-fee-and-duedates', {
                url: '/annual-fee-and-duedates',
                templateUrl: ADMINURL + 'fee_duedates/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'fee_duedates/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Set Annual Fee and Duedates',
                    urlGroup: 'Administrative',
                    formName: 'Set Annual Fee and Duedates',
                },
            })
            .state('app.administrative.lot-rate', {
                url: '/lot-rate',
                templateUrl: ADMINURL + 'lot_rate/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'lot_rate/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Set Lot Rate',
                    urlGroup: 'Administrative',
                    formName: 'Set Lot Rate',
                },
            })
            .state('app.administrative.payee-list', {
                url: '/payee-list',
                templateUrl: ADMINURL + 'payee_list/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'payee_list/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Payee List',
                    urlGroup: 'Administrative',
                    formName: 'Payee List',
                },
            })
            .state('app.administrative.default-signatories', {
                url: '/default-signatories',
                templateUrl: ADMINURL + 'default_signatories/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'default_signatories/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Default Signatories',
                    urlGroup: 'Administrative',
                    formName: 'Default Signatories',
                },
            })
            .state('app.administrative.bank-account', {
                url: '/bank-account',
                templateUrl: ADMINURL + 'bank_acc/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'bank_acc/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > Bank Account List',
                    urlGroup: 'Administrative',
                    formName: 'Bank Account List',
                },
            })

        //TRANSACTION
        .state('app.transaction', {
                abstract: true,
            })
            .state('app.transaction.cashiering-payment', {
                url: '/cashiering-payment',
                templateUrl: TRANSURL + 'cashiering_payment/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'cashiering_payment/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Cashiering Payment',
                    urlGroup: 'Transaction',
                    formName: 'Cashiering Payment',
                },
            })
            .state('app.transaction.petty-cash-entry', {
                url: '/petty-cash-entry',
                templateUrl: TRANSURL + 'petty_cash_entry/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'petty_cash_entry/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Petty Cash Entry',
                    urlGroup: 'Transaction',
                    formName: 'Petty Cash Entry',
                },
            })
            .state('app.transaction.check-issuance', {
                url: '/check-issuance',
                templateUrl: TRANSURL + 'check_voucher/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'check_voucher/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Check Issuance',
                    urlGroup: 'Transaction',
                    formName: 'Check Issuance',
                },
            })
            .state('app.transaction.general-journal-entry', {
                url: '/general-journal-entry',
                templateUrl: TRANSURL + 'journal_voucher/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'journal_voucher/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > General Journal Entry',
                    urlGroup: 'Transaction',
                    formName: 'General Journal Entry',
                },
            })
            .state('app.transaction.monthly-receivable', {
                url: '/monthly-receivable',
                templateUrl: TRANSURL + 'monthly_receivable/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'monthly_receivable/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Run Monthly Receivable',
                    urlGroup: 'Transaction',
                    formName: 'Run Monthly Receivable',
                },
            })
            .state('app.transaction.annual-receivable', {
                url: '/annual-receivable',
                templateUrl: TRANSURL + 'annual_receivable/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'annual_receivable/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Run Annual Receivable',
                    urlGroup: 'Transaction',
                    formName: 'Run Annual Receivable',
                },
            })
            .state('app.transaction.cashier-daily-denomination', {
                url: '/cashier-daily-denomination',
                templateUrl: TRANSURL + 'cashier_daily_denomination/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'cashier_daily_denomination/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Cashier Daily Denomination',
                    urlGroup: 'Transaction',
                    formName: 'Cashier Daily Denomination',
                },
            })
            // .state('app.transaction.monthly-dues-ledger', {
            // 	url: '/monthly-dues-ledger',
            // 	templateUrl: TRANSURL + 'monthly_dues_ledger/view.html?v=' + VERSION,
            // 	resolve: {
            // 		loadMyCtrl: [
            // 			'$ocLazyLoad',
            // 			function ($ocLazyLoad) {
            // 				return $ocLazyLoad.load({
            // 					files: [TRANSURL + 'monthly_dues_ledger/controller.js?v=' + VERSION],
            // 				});
            // 			},
            // 		],
            // 	},
            // 	params: {
            // 		urlName: 'Transaction > Monthly Dues Ledger',
            // 		urlGroup: 'Transaction',
            // 		formName: 'Monthly Dues Ledger',
            // 	},
            // })
            // .state('app.transaction.construction-bond', {
            // 	url: '/construction-bond',
            // 	templateUrl: TRANSURL + 'construction_bond/view.html?v=' + VERSION,
            // 	resolve: {
            // 		loadMyCtrl: [
            // 			'$ocLazyLoad',
            // 			function ($ocLazyLoad) {
            // 				return $ocLazyLoad.load({
            // 					files: [TRANSURL + 'construction_bond/controller.js?v=' + VERSION],
            // 				});
            // 			},
            // 		],
            // 	},
            // 	params: {
            // 		urlName: 'Transaction > Construction Bond',
            // 		urlGroup: 'Transaction',
            // 		formName: 'Construction Bond',
            // 	},
            // })
            .state('app.transaction.ledger', {
                url: '/ledger',
                templateUrl: TRANSURL + 'ledger/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'ledger/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Ledger',
                    urlGroup: 'Transaction',
                    formName: 'Ledger',
                },
            })
            .state('app.transaction.aging', {
                url: '/aging',
                templateUrl: TRANSURL + 'aging/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'aging/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Aging',
                    urlGroup: 'Transaction',
                    formName: 'Aging',
                },
            })
            // .state('app.transaction.journal', {
            // 	url: '/journal-voucher',
            // 	templateUrl: TRANSURL + 'journal_voucher/view.html?v=' + VERSION,
            // 	resolve: {
            // 		loadMyCtrl: [
            // 			'$ocLazyLoad',
            // 			function ($ocLazyLoad) {
            // 				return $ocLazyLoad.load({
            // 					files: [TRANSURL + 'journal_voucher/controller.js?v=' + VERSION],
            // 				});
            // 			},
            // 		],
            // 	},
            // 	params: {
            // 		urlName: 'Transaction > Journal Voucher',
            // 		urlGroup: 'Transaction',
            // 		formName: 'Journal Voucher',
            // 	},
            // })
            // .state('app.transaction.check-voucher', {
            // 	url: '/check-voucher',
            // 	templateUrl: TRANSURL + 'check_voucher/view.html?v=' + VERSION,
            // 	resolve: {
            // 		loadMyCtrl: [
            // 			'$ocLazyLoad',
            // 			function ($ocLazyLoad) {
            // 				return $ocLazyLoad.load({
            // 					files: [TRANSURL + 'check_voucher/controller.js?v=' + VERSION],
            // 				});
            // 			},
            // 		],
            // 	},
            // 	params: {
            // 		urlName: 'Transaction > Check Voucher',
            // 		urlGroup: 'Transaction',
            // 		formName: 'Check Voucher',
            // 	},
            // })
            //REPORTS
            .state('app.reports', {
                abstract: true,
            })
            .state('app.reports.aging-of-receivable', {
                url: '/aging-of-receivable',
                templateUrl: REPURL + 'aging_of_receivable/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'aging_of_receivable/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Aging of Receivable',
                    urlGroup: 'Reports',
                    formName: 'Aging of Receivable',
                },
            })
            .state('app.reports.general-ledger-report', {
                url: '/general-ledger-report',
                templateUrl: REPURL + 'general_ledger_report/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'general_ledger_report/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > General Ledger Report',
                    urlGroup: 'Reports',
                    formName: 'General Ledger Report',
                },
            })
            .state('app.reports.collection-vs-receivable', {
                url: '/collection-vs-receivable',
                templateUrl: REPURL + 'collection_vs_receivable/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'collection_vs_receivable/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Collection vs Receivable',
                    urlGroup: 'Reports',
                    formName: 'Collection vs Receivable',
                },
            })
            .state('app.reports.construction-bond-report', {
                url: '/construction-bond-report',
                templateUrl: REPURL + 'construction_bond_report/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'construction_bond_report/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Construction Bond Report',
                    urlGroup: 'Reports',
                    formName: 'Construction Bond Report',
                },
            })
            .state('app.reports.cashier-daily-cash-position', {
                url: '/cashier-daily-cash-position',
                templateUrl: REPURL + 'cashier_daily_cash_disposition/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'cashier_daily_cash_disposition/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Cashier Daily Cash Position',
                    urlGroup: 'Reports',
                    formName: 'Cashier Daily Cash Position',
                },
            })
            .state('app.reports.cashier-summary', {
                url: '/cashier-summary',
                templateUrl: REPURL + 'cashier_summary/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'cashier_summary/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Cashier Summary',
                    urlGroup: 'Reports',
                    formName: 'Cashier Summary',
                },
            })
            .state('app.reports.trial-balance', {
                url: '/trial-balance',
                templateUrl: REPURL + 'trial_balance/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'trial_balance/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Financial Report',
                    urlGroup: 'Reports',
                    formName: 'Trial Balance',
                },
            })
            .state('app.reports.income-statement', {
                url: '/income-statement',
                templateUrl: REPURL + 'income_statement/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'income_statement/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Income Statement',
                    urlGroup: 'Reports',
                    formName: 'Income Statement',
                },
            })
            .state('app.reports.balance-sheet', {
                url: '/balance-sheet',
                templateUrl: REPURL + 'balance_sheet/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'balance_sheet/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Balance Sheet',
                    urlGroup: 'Reports',
                    formName: 'Balance Sheet',
                },
            })
            .state('app.reports.journal-book', {
                url: '/journal-book',
                templateUrl: REPURL + 'journal_book/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'journal_book/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Journal Book',
                    urlGroup: 'Reports',
                    formName: 'Journal Book',
                },
            })
            .state('app.reports.comparative-is', {
                url: '/comparative-is',
                templateUrl: REPURL + 'comparative_is/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'comparative_is/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Comparative Income Statement',
                    urlGroup: 'Reports',
                    formName: 'Comparative Income Statement',
                },
            })
            .state('app.reports.masterfile-reports', {
                url: '/masterfile-reports',
                templateUrl: REPURL + 'masterfile_reports/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'masterfile_reports/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Generate Masterfile Report',
                    urlGroup: 'Reports',
                    formName: 'Generate Masterfile Report',
                },
            })
            .state('app.reports.collection-summary-report', {
                url: '/collection-summary-report',
                templateUrl: REPURL + 'collection_summary_reports/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [REPURL + 'collection_summary_reports/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Reports > Generate Collection Summary Report',
                    urlGroup: 'Reports',
                    formName: 'Generate Collection Summary Report',
                },
            })
        $locationProvider.hashPrefix('');
    },
]);
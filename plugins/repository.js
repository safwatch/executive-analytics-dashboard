import repository from '~/api/repository';

export default (ctx, inject) => {
  const repositoryWithAxios = repository(ctx.$axios);

  //auth
  inject('userLogoutRepo', repositoryWithAxios('/user/logout'));
  inject('userLoginRepo', repositoryWithAxios('/user/login'));
  inject('userProfileRepo', repositoryWithAxios('user/profile'));
  inject('userChangePasswordRepo', repositoryWithAxios('user/changepassword'));


  //module
  inject('moduleListRepo', repositoryWithAxios('/sysmodule'));
  inject('moduleCreateRepo', repositoryWithAxios('/sysmodule/create'));
  inject('moduleUpdateRepo', repositoryWithAxios('/sysmodule/update'));
  inject('moduleDeleteRepo', repositoryWithAxios('/sysmodule/delete'));

  //group
  inject('groupListRepo', repositoryWithAxios('/sysgroup'));
  inject('groupCreateRepo', repositoryWithAxios('/sysgroup/create'));
  inject('groupUpdateRepo', repositoryWithAxios('/sysgroup/update'));
  inject('groupDeleteRepo', repositoryWithAxios('/sysgroup/delete'));

  //user
  inject('userListRepo', repositoryWithAxios('/sysuser'));
  inject('userCreateRepo', repositoryWithAxios('/sysuser/create'));
  inject('userUpdateRepo', repositoryWithAxios('/sysuser/update'));
  inject('userDeleteRepo', repositoryWithAxios('/sysuser/delete'));
  inject('userReseteRepo', repositoryWithAxios('/sysuser/reset'));

  //sysrole
  inject('roleListRepo', repositoryWithAxios('/sysrole'));
  inject('roleDetailRepo', repositoryWithAxios('sysrole/detail'));
  inject('roleUpdateRepo', repositoryWithAxios('sysrole/update'));

  //menu
  inject('menuListRepo', repositoryWithAxios('/sysmenu'));
  inject('menuCreateRepo', repositoryWithAxios('/sysmenu/create'));
  inject('menuUpdateRepo', repositoryWithAxios('/sysmenu/update'));
  inject('menuDeleteRepo', repositoryWithAxios('/sysmenu/delete'));
  inject('menuLastRepo', repositoryWithAxios('/sysmenu/last'));

  //permission menu
  inject('permissionMenuRepo', repositoryWithAxios('/user/permission'));

  //healt-covid
  inject('healthCovidCaseRepo', repositoryWithAxios('covid19/recap'));
  inject('healthCovidNationRepo', repositoryWithAxios('/covid19/nation'));
  inject('healthCovidSubdistrictRepo', repositoryWithAxios('/covid19/subdistrict'));
  inject('healthCovidDistrictRepo', repositoryWithAxios('/covid19/district'));

  //healt-covid-donation
  inject('healthCovidDonRepo', repositoryWithAxios('covid19/donation'));
  inject('healthCovidDonYearRepo', repositoryWithAxios('/covid19/donation_year'));

  // sysconfig main
  inject('configDetailRepo', repositoryWithAxios('/sysconfig/detail'));
  inject('configUpdateRepo', repositoryWithAxios('/sysconfig/update'));

  //auth
  inject('userAuthRepo', repositoryWithAxios('/user/authorization'));

  //work unit
  inject('workUnitListRepo', repositoryWithAxios('/workunit'));
  inject('workUnitCreateRepo', repositoryWithAxios('/workunit/create'));
  inject('workUnitUpdateRepo', repositoryWithAxios('/workunit/update'));
  inject('workUnitDeleteRepo', repositoryWithAxios('/workunit/delete'));

  //work unit
  inject('permissionListRepo', repositoryWithAxios('/permission'));
  inject('permissionCreateRepo', repositoryWithAxios('/permission/create'));
  inject('permissionUpdateRepo', repositoryWithAxios('/permission/update'));
  inject('permissionStatusUpdateRepo', repositoryWithAxios('/permission/status'));
  inject('permissionDeleteRepo', repositoryWithAxios('/permission/delete'));

  //mantra
  inject('satudataRepo', repositoryWithAxios('/mantra'));

  //satudata token
  inject('satudataSigninRepo', repositoryWithAxios('/satudata/get_token'));
  inject('satudataCheckTokenRepo', repositoryWithAxios('/satudata/check_token_health'));

  //P3KE
  // inject('p3keIndividuRepo', repositoryWithAxios('/satudata/p3ke_individu'));
  inject('p3keIndividuRepo', repositoryWithAxios('/satudata/p3ke_individu_local'));
  // inject('p3keKeluargaRepo', repositoryWithAxios('/satudata/p3ke_keluarga'));
  inject('p3keKeluargaRepo', repositoryWithAxios('/satudata/p3ke_keluarga_local'));
  inject('p3keKeluargaRutilahuRepo', repositoryWithAxios('/satudata/p3ke_keluarga_rutilahu_local'));
  inject('p3keKeluargaBukanListrikRepo', repositoryWithAxios('/satudata/p3ke_keluarga_bukan_listrik_local'));
  inject('p3keKeluargaFasilitasBABBersamaRepo', repositoryWithAxios('/satudata/p3ke_keluarga_fasilitas_bab_bersama_local'));
  inject('p3keKeluargaFasilitasBABBukanPribadiUmumRepo', repositoryWithAxios('/satudata/p3ke_keluarga_fasilitas_bab_bukan_pribadi_umum_local'));
  inject('p3keLocalRepo', repositoryWithAxios('/satudata/p3ke_localization'));

  // Tableau
  inject('tableauTrustedTicketRepo', repositoryWithAxios('/get-trusted-ticket'));

  // Import
  inject('importCsvRepo', repositoryWithAxios('/datastore/create'));

  // INFLATION
  // 1. Inflation Profile
  inject('inflationYoYRepo', repositoryWithAxios('/m_inflation/yoy'));
  inject('inflationYoYRecapRepo', repositoryWithAxios('/m_inflation/yoy'));
  inject('inflationMtMRepo', repositoryWithAxios('/m_inflation/mtm'));
  inject('inflationMtMFullYearRepo', repositoryWithAxios('/m_inflation/mtm_recap'));
  inject('inflationActionPlanAndStrategiesRepo', repositoryWithAxios('/m_inflation/actplan_strategy_trend'));
  // inject('inflationActionPlanAndStrategyListRepo', repositoryWithAxios('/m_inflation/get_strategi_rencana_aksi'));
  inject('inflationActionPlanAndStrategyListRepo', repositoryWithAxios('/overview/get_strategi_rencana_aksi'));
  inject('inflationBudgetRealizationRepo', repositoryWithAxios('/m_inflation/budget_realization_trend'));
  inject('monitoringInflationControlRepo', repositoryWithAxios('/overview/get_monitoring_inflation_control'));
  inject('monitoringCommodityRepo', repositoryWithAxios('/overview/get_pemantauan_komoditas'));
  inject('fiveYearTrendRepo', repositoryWithAxios('/m_inflation/fiveyear_trend'));

  // 1.0.1
  inject('inflationIPHRepo', repositoryWithAxios('/m_inflation/iph_by_month'));
  inject('inflationIPHByYearTrendRepo', repositoryWithAxios('/m_inflation/trend_iph_per_year'));
  inject('inflationTotalWorkunitRepo', repositoryWithAxios('/m_inflation/total_workunit'));
  inject('inflationBNBudgetRealizationRepo', repositoryWithAxios('/m_inflation/budget_realization_trend_new'));
  inject('inflationBNActionPlanStrategiesRepo', repositoryWithAxios('/m_inflation/actplan_strategy_trend_new'));
  inject('inflationActionPlanListRepo', repositoryWithAxios('rencana_aksi/get_strategi'));
  inject('inflationActionPlanDetailRepo', repositoryWithAxios('rencana_aksi/get_detail_strategi'));

  // 2. Inflation Analytics
  inject('aggCivicRankInJabarRepo', repositoryWithAxios('/m_inflation_analyst/aggregate_civic_in_jabar'));
  inject('civicRankInBandungRayaRepo', repositoryWithAxios('/m_inflation_analyst/positioning_civic_in_bandungraya'));
  inject('civicRankInJabarRepo', repositoryWithAxios('/m_inflation_analyst/positioning_civic_in_jabar'));
  inject('civicRankInNationalRepo', repositoryWithAxios('/m_inflation_analyst/positioning_civic_in_nasional'));

  // 1.0.1
  inject('summaryCivicRankJabarRepo', repositoryWithAxios('/m_inflation_analyst/aggregate_civic_in_jabar_new'));
  inject('summaryCivicIPHCompareBandungRayaRepo', repositoryWithAxios('/m_inflation_analyst/positioning_civic_in_bandungraya_new'));
  inject('summaryCivicIPHCompareJabarRepo', repositoryWithAxios('/m_inflation_analyst/positioning_civic_in_jabar_new'));
  inject('summaryCivicIPHCompareNasionalRepo', repositoryWithAxios('/m_inflation_analyst/positioning_civic_in_nasional_new'));

  inject('summaryAggIPHPriceIndex', repositoryWithAxios('/m_inflation_analyst/price_index'));
  inject('summaryAggIndividualCheapFoodIntervention', repositoryWithAxios('/m_inflation_analyst/market_recipients'));
  inject('summaryAggRegionalCooperationQuota', repositoryWithAxios('/m_inflation_analyst/interregional_cooperation'));
  inject('summaryAggCheapMarketAvailable', repositoryWithAxios('/m_inflation_analyst/total_cheap_market'));
  inject('IPHDataYearSeriesRepo', repositoryWithAxios('/m_inflation_analyst/iph_yearseries'));

  // 2.1 spatial & pasar commodities
  inject('pasarWithCommodityPriceChangesRepo', repositoryWithAxios('/m_inflation_analyst/count_of_commodities_with_price_increase'));
  inject('inflationPriceChangesRepo', repositoryWithAxios('/m_inflation_analyst/price_changes_recap'));
  inject('inflationDataYearSeriesRepo', repositoryWithAxios('/m_inflation_analyst/mtm_yearseries'));
  inject('FoodCommodityBalanceRepo', repositoryWithAxios('/m_inflation_analyst/food_balance_recap'));
  inject('FoodSustainabilityRepo', repositoryWithAxios('/m_inflation_analyst/food_sustainability_index_latest_data'));
  inject('consumerPriceIndexRepo', repositoryWithAxios('/m_inflation_analyst/consumer_price_latest_data'));
  inject('commodityAggregatePricesRepo', repositoryWithAxios('/m_inflation_analyst/agg_inflation_commodities_contributor_by_id'));


  inject('inflationFoodCommodity', repositoryWithAxios('m_commodities/get_commodities_in_a_week'));
  inject('inflationFoodStatusCommodity', repositoryWithAxios('m_commodities/get_chart_status_commodities'));

  inject('inflationAnnualTrendRepo', repositoryWithAxios('/inflation/annual_trend'));
  inject('inflationMonthlyTrendRepo', repositoryWithAxios('/inflation/monthly_trend'));
  inject('inflationControlRepo', repositoryWithAxios('/inflation/control'));
  inject('inflationBudgetRepo', repositoryWithAxios('/inflation/budget'));
  inject('inflationYearFilterRepo', repositoryWithAxios('/inflation/get-years'));
  inject('inflationCPIRecapVizRepo', repositoryWithAxios('/inflation/cpi-recap-viz'));
  inject('inflationCivicVsJabarVsNationalRepo', repositoryWithAxios('/inflation/civic_vs_jabar_vs_national'));
  inject('inflationCivicVsBandungRayaVsJabarRepo', repositoryWithAxios('/inflation/civic_vs_bandungraya_vs_jabar'));
  inject('inflationFilterComodity', repositoryWithAxios('/m_commodities/get_filter_commodities'));



  // 3. Inflation Reports
  inject('reportActionPlanAndStrategiesRepo', repositoryWithAxios('/m_inflation_report/agg_total_action_plan'));
  inject('reportTargetAndRealizationRepo', repositoryWithAxios('/m_inflation_report/agg_sum_target_and_realization_chart_compact'));
  inject('reportTotalWorkunitByYearRepo', repositoryWithAxios('/m_inflation_report/workunit_get_involved'));
  inject('reportFoodBalanceRepo', repositoryWithAxios('/m_inflation_report/food_balance_matrix_by_year'));
  inject('reportIPHMonthlyRepo', repositoryWithAxios('/m_inflation_report/iph_monthly_index_by_year'));
  inject('reportIPHYearlyRepo', repositoryWithAxios('/m_inflation_report/iph_months_index_per_year'));

  // 4. Inflation Summary Dashboard
  inject('summaryTargetAndRealizationRepo', repositoryWithAxios('/m_inflation_summary/agg_sum_target_and_realization_chart_compact'));
  inject('inflationYoYFullYearRepo', repositoryWithAxios('/m_inflation_summary/yoy_10th_recap'));
  inject('civicMarketListRepo', repositoryWithAxios('/m_inflation_summary/civic_market_data_master'));
  inject('iph12WeeksRepo', repositoryWithAxios('/m_inflation_summary/iph_12_weeks_recap'));
  inject('summaryPasarCommodityAggregatePricesRepo', repositoryWithAxios('/m_inflation_summary/selected_pasar_to_agg_inflation_commodities_contributor_by_id'));

  // 5. Food Inflation → Profile
  inject('distributionMarket', repositoryWithAxios('/m_food_inflation/data_pasar'));
  inject('totalCommodity', repositoryWithAxios('/m_food_inflation/data_total_komoditas'));
  inject('inflationPriceDevIndex', repositoryWithAxios('/m_food_inflation/indeks_perkembangan_harga'));
  inject('inflationCommodityDevIndex', repositoryWithAxios('/m_food_inflation/chart_status_comodity'));
  inject('inflationMarketDevIndex', repositoryWithAxios('/m_food_inflation/chart_status_market'));
  inject('marketWithTreeCommodities', repositoryWithAxios('m_food_inflation_profile/three_commodities_from_market_cimindi'));
  inject('inflationCommodityMonth1', repositoryWithAxios('/m_food_inflation/komoditas_andil_inflasi_1_bln_prior'));
  inject('inflationCommodityMonth2', repositoryWithAxios('/m_food_inflation/komoditas_andil_inflasi_2_bln_prior'));
  inject('inflationCommodityMonth3', repositoryWithAxios('/m_food_inflation/komoditas_andil_inflasi_3_bln_prior'));
  inject('inflationCommodityMonth4', repositoryWithAxios('/m_food_inflation/komoditas_andil_inflasi_4_bln_prior'));
  inject('inflationGaugeCommoddity', repositoryWithAxios('/m_food_inflation/total_komoditas_inflasi'));
  inject('inflationTreeMapCommoddity', repositoryWithAxios('/m_food_inflation/data_treemap'));

  // 1.0.1
  inject('foodIPHMonthlyRepo', repositoryWithAxios('/m_food_inflation/iph_by_month_series'));
  inject('foodAggCommodityChangeRepo', repositoryWithAxios('/m_food_inflation/chart_status_comodity_new'));
  inject('foodAggMarketPriceChangeRepo', repositoryWithAxios('/m_food_inflation/chart_status_market_new'));
  inject('foodAggCheapMarketRepo', repositoryWithAxios('/m_food_inflation/cheap_market'));
  inject('foodCommodityLatestQuarterRepo', repositoryWithAxios('/m_food_inflation/comodities_4_month_before'));
  inject('foodIPHCommodityTreemapRepo', repositoryWithAxios('/m_food_inflation/data_treemap_new'));

  // Pemantauan komoditas 20 treemap
  inject('heatmapComodityMonitoringRepo', repositoryWithAxios('/m_food_inflation/treemap'));
  // Map Per-pasar (60 komoditas PerPasar)
  inject('marketComodityDistributionRepo', repositoryWithAxios('/m_food_inflation/market_comodity_distribution'));

  // overview - Pemantauan Komoditas - Bulan .. tahun ...
  inject('monthlyComodityMonitoringRepo', repositoryWithAxios('/overview/get_pemantauan_komoditas'));

};

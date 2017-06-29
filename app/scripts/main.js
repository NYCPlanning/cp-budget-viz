/* eslint-env browser */
import jquery from 'jquery';
import _ from 'underscore';
import 'jquery.scrollto';
import Tabletop from 'tabletop';
import * as d3 from 'd3';

(function($) {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  $('body').on('click', '.js-smooth-scroll', _.debounce(e => {
    e.preventDefault();
    const hash = $(e.currentTarget).attr('href');
    const $scrollTarget = $(hash);
    $(window).scrollTo($scrollTarget, 300, {
      onAfter: () => {
        window.location.hash = hash;
      }
    });
  }, 200, true)).on('click', '.js-toggle-nav', _.debounce(e => {
    $(e.currentTarget).blur();
    $('body').toggleClass('nav-active');
  }, 200, true));

  $('.header-links .agencies').on('click', function() {
    if ($('.agencies-menu').hasClass('active')) {
      $('.agencies-menu').removeClass('active');
    } else {
      $('.agencies-menu').addClass('active');
    }
  });

  $('.header-nav .agencies').on('click', function(e) {
    e.stopPropagation();
    $('.main-header, .header-nav').addClass('selected');
  });

  $(document).on('click', function (e) {
    if ($('.header-nav').hasClass('selected')) {
      $('.main-header, .header-nav').removeClass('selected');
    }
  });

  $('aside.content-sidebar .internal-nav li.selected').on('click', function() {
    if (!$('aside.content-sidebar .internal-nav ol').hasClass('open')) {
      $('aside.content-sidebar .internal-nav ol').addClass('open');
    }
  });

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/17Gd9ey3bcv7au4B7L0ioiglFCS9diB4ntHDIQgBu1AI/pubhtml';
  var budget_array = [];
  var cat_array = [];
  var life_array = [];
  var service_array = [];
  var source_array = [];

  Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         debug: true } )

  function showInfo(data, tabletop) {

    if ($('.standalone').length > 0) {

      var small_budget_array = [];
      var budgetTotal = 0;
      var divideBy = 1000;

      $.each( tabletop.sheets("By Ten-Year Plan Category").all(), function(i, category) {
        var toMatch = new RegExp($('.hidden-category').html());
        if (category.ProjectType.match(toMatch)) {
          var agencyName = category.Agency.replace(/ /g,'').replace(/\'/g,'').replace(/\&/g,'').toLowerCase();
          var numBudget = category.TYCSAllocation.replace(/\,/g,'');

          var displayAmountRaw = category.TYCSAllocation.toString();
          var displayAmount;
          if (displayAmountRaw.length > 10) {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 9) + 'M';
            displayAmount = displayAmount.replace(/,/,'.');
            divideBy = 10000;
          } else {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 5) + 'K';
            displayAmount = displayAmount.replace(/,/,'.');
          }

          var by_cat = $('<li class="budget-portion"><div class="budget"></div><h4><span class="budgetamount">$' + displayAmount + '</span> <span class="budgetname">' + category.TYPCategory + '</span></h4></li>');

          by_cat.appendTo("#infrastructure");
          budgetTotal += parseInt(numBudget);
          small_budget_array.push(numBudget);
        }
      });

      $('.budget-dollars').html(budgetTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

      d3.selectAll(".budget-portion").data(small_budget_array).transition().style("height", function(d) { return (d / divideBy) + "px"; } );

    }

    if ($('.interior-page').length === 0) {

      $.each( tabletop.sheets("By Agency").all(), function(i, infrastructure) {
        
        if (infrastructure.Agency !== 'Agency') {

          var displayAmountRaw = infrastructure.TYCSAllocation.toString();
          var displayAmount;
          if (displayAmountRaw.length > 8) {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 7) + 'M';
            displayAmount = displayAmount.replace(/,/,'.');
          } else {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 5) + 'K';
            displayAmount = displayAmount.replace(/,/,'.');
          }

          var cat_li = $('<li class="allindustry" style="margin: 2px 0 0; display: table;"><div class="budget"></div><span class="budgetlabel"><h4><span class="budgetamount">' + displayAmount + '</span> <span class="budgetname">' + infrastructure.Agency + '</span></h4></span></li>');

          budget_array.push(infrastructure.Percent);
          cat_li.appendTo("#infrastructure");

        }

      });

      $.each( tabletop.sheets("By Ten-Year Plan Category").all(), function(i, category) {
        if (category.Agency !== 'Agency') {
          var agencyName = category.Agency.replace(/ /g,'').replace(/\'/g,'').replace(/\&/g,'').toLowerCase();
          var serviceName = 'service-' + category.ServiceCategory.replace(/ /g,'').replace(/\'/g,'').replace(/\&/g,'').toLowerCase();
          var numBudget = category.TYCSAllocation.replace(/\,/g,'');

          var displayAmountRaw = category.TYCSAllocation.toString();
          var displayAmount;
          if (displayAmountRaw.length > 10) {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 9) + 'M';
            displayAmount = displayAmount.replace(/,/,'.');
          } else {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 5) + 'K';
            displayAmount = displayAmount.replace(/,/,'.');
          }

          var by_cat = $('<li class="tycsa ' + agencyName + ' ' + serviceName + '"><div class="budget"></div><span class="budgetlabel"><h4><span class="budgetamount">$' + displayAmount + '</span> <span class="budgetname category-name">' + category.TYPCategory + '</span></h4></span></li>');

          by_cat.appendTo("#infrastructure");
          cat_array.push(numBudget);
        }
      });

      $.each( tabletop.sheets("By Lifecycle Category").all(), function(i, category) {
        if (category.Agency !== 'LifecycleCategory') {
          var lifecycleName = category.LifecycleCategory.replace(/ /g,'').replace(/\'/g,'').replace(/\&/g,'').toLowerCase();
          var lifecycleBudget = category.TYCSAllocation.replace(/\,/g,'').replace(/\$/g,'');

          var displayAmountRaw = category.TYCSAllocation.toString();
          var displayAmount;
          if (displayAmountRaw.length > 9) {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 9) + 'M';
            displayAmount = displayAmount.replace(/,/,'.');
          } else {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 7) + 'K';
            displayAmount = displayAmount.replace(/,/,'.');
          }

          var by_life = $('<li class="lifecyclevis ' + lifecycleName + '"><div class="budget"></div><span class="budgetlabel"><h4><span class="budgetamount">' + displayAmount + '</span> <span class="budgetname">' + category.LifecycleCategory + '</span></h4></span></li>');

          by_life.appendTo("#infrastructure");
          life_array.push(lifecycleBudget);
        }
      });

      $.each( tabletop.sheets("By Service Category").all(), function(i, category) {
        if (category.Agency !== 'ServiceCategory') {
          var serviceName = 'service-' + category.ServiceCategory.replace(/ /g,'').replace(/\'/g,'').replace(/\&/g,'').toLowerCase();
          var serviceBudget = category.TYCSAllocation.replace(/\,/g,'').replace(/\$/g,'');

          var displayAmountRaw = category.TYCSAllocation.toString();
          var displayAmount;
          if (displayAmountRaw.length > 11) {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 9) + 'M';
            displayAmount = displayAmount.replace(/,/,'.');
          } else {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 5) + 'K';
            displayAmount = displayAmount.replace(/,/,'.');
          }

          var by_service = $('<li class="servicevis ' + serviceName + '"><div class="budget"></div><span class="budgetlabel"><h4><span class="budgetamount">' + displayAmount + '</span> <span class="budgetname">' + category.ServiceCategory + '</span></h4></span></li>');

          by_service.appendTo("#infrastructure");
          service_array.push(serviceBudget);
        }
      });

      $.each( tabletop.sheets("By Funding Source").all(), function(i, category) {
        if (category.Agency !== 'Agency') {
          var agencyName = category.Agency.replace(/ /g,'').replace(/\'/g,'').replace(/\&/g,'').toLowerCase();
          var numBudget = category.TYCSAllocation.replace(/\,/g,'');

          var displayAmountRaw = category.TYCSAllocation.toString();
          var displayAmount;
          if (displayAmountRaw.length > 11) {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 9) + 'M';
            displayAmount = displayAmount.replace(/,/,'.');
          } else {
            displayAmount = displayAmountRaw.substring(0, displayAmountRaw.length - 5) + 'K';
            displayAmount = displayAmount.replace(/,/,'.');
          }

          var by_source = $('<li class="fundingvis ' + agencyName + '"><div class="budget"></div><h4><span class="budgetamount">' + displayAmount + '</span> <span class="budgetname">' + category.Agency + '</span></h4></li>');

          by_source.appendTo("#infrastructure");
          source_array.push(numBudget);
        }
      });
      


      d3.selectAll(".allindustry").data(budget_array).transition().style("height", function(d) { return (d * 500) + "px"; } );

      $('.allindustry').click(function() {

        var thisIndustry = $(this).children('.budgetlabel').children('h4').children('.budgetname').html();
        var thisBudget = $(this).children('.budgetlabel').children('h4').children('.budgetamount').html();
        var agencyName = thisIndustry.replace(/ /g,'').replace(/\'/g,'').replace(/&/g,'').replace(/amp\;/g,'').toLowerCase();

        $('.category').html(thisIndustry + ' - ' + thisBudget);
        $('.back-agencies').html('<p class="more-info"><a>Back to all agencies</a></p>');

        $('.allindustry, .lifecyclevis, .servicevis, .fundingvis').css({'height':'0'}).css({'margin':'0'}).css({'display':'none'});

        d3.selectAll(".tycsa").data(cat_array).transition().style('display', function(d) { 
          if ($(this).hasClass(agencyName)) { 
            return 'table'; 
          } else {
            return 'none';
          }
        }).style('margin', function(d) { 
          if ($(this).hasClass(agencyName)) { 
            return '2px 0 0'; 
          } else {
            return '0';
          }
        }).style("height", function(d) { 
          if ($(this).hasClass(agencyName)) { 
            return (d / 25000) + "px"; 
          }
        });

      });

      $('.servicevis').click(function() {

        var thisService = $(this).children('.budgetlabel').children('h4').children('.budgetname').html();
        var thisBudget = $(this).children('.budgetlabel').children('h4').children('.budgetamount').html();
        var serviceName = 'service-' + thisService.replace(/ /g,'').replace(/\'/g,'').replace(/&/g,'').replace(/amp\;/g,'').toLowerCase();

        $('.category').html(thisService + ' - ' + thisBudget);
        $('.back-services').html('<p class="more-info"><a>Back to all services</a></p>');

        $('.allindustry, .lifecyclevis, .servicevis, .fundingvis').css({'height':'0'}).css({'margin':'0'}).css({'display':'none'});

        d3.selectAll(".tycsa").data(cat_array).transition().style('display', function(d) { 
          if ($(this).hasClass(serviceName)) { 
            return 'table'; 
          } else {
            return 'none';
          }
        }).style('margin', function(d) { 
          if ($(this).hasClass(serviceName)) { 
            return '2px 0 0'; 
          } else {
            return '0';
          }
        }).style("height", function(d) { 
          if ($(this).hasClass(serviceName)) { 
            return (d / 25000) + "px"; 
          }
        });

      });

      $('button.agency, .back-agencies').click(function() {
        $('.investmentfilter').removeClass('selected');
        $('button.agency').addClass('selected');

        $('.category, .back-agencies, .back-services').html('');

        $('.tycsa, .lifecyclevis, .servicevis, .fundingvis').css({'height':'0'}).css({'min-height':'0'}).css({'margin':'0'}).css({'display':'none'});

        d3.selectAll(".allindustry").data(budget_array).transition().style('display','table').style('margin','2px 0 0').style("height", function(d) { return (d * 500) + "px"; } );
      });

      $('button.lifecycle').click(function() {
        $('.investmentfilter').removeClass('selected');
        $(this).addClass('selected');

        $('.category, .back-agencies, .back-services').html('');

        $('.tycsa, .allindustry, .servicevis, .fundingvis').css({'height':'0'}).css({'min-height':'0'}).css({'margin':'0'}).css({'display':'none'});

        d3.selectAll(".lifecyclevis").data(life_array).transition().style('display','table').style('margin','2px 0 0').style("height", function(d) { return (d / 100000) + "px"; } );
      });

      $('button.service, .back-services').click(function() {
        $('.investmentfilter').removeClass('selected');
        $('button.service').addClass('selected');

        $('.category, .back-agencies, .back-services').html('');

        $('.tycsa, .allindustry, .lifecyclevis, .fundingvis').css({'height':'0'}).css({'min-height':'0'}).css({'margin':'0'}).css({'display':'none'});

        d3.selectAll(".servicevis").data(service_array).transition().style('display','table').style('margin','2px 0 0').style("height", function(d) { return (d / 100000) + "px"; } );
      });

      $('button.source').click(function() {
        $('.investmentfilter').removeClass('selected');
        $(this).addClass('selected');

        $('.category, .back-agencies, .back-services').html('');

        $('.tycsa, .allindustry, .lifecyclevis, .servicevis').css({'height':'0'}).css({'min-height':'0'}).css({'margin':'0'}).css({'display':'none'});

        d3.selectAll(".fundingvis").data(service_array).transition().style('display','table').style('margin','2px 0 0').style("height", function(d) { return (d / 100000) + "px"; } );
      })

    }

  }

  // mobile agencies nav
  $('.agencylist').change(function() {
    var urlNext = $(".agencylist option:selected").attr('class');
    if (urlNext === 'transportation') {
      window.location.href = '/transportation_overview.html';
    }
  });

  function mobileTables() {
    if ($(window).width() < 959) {
      $('table.responsive').each(function(i, currentTable) {
        var leftTable = currentTable.innerHTML;
        var $parent = $(this).parent();
        var $scrollparent = $parent.parent();
        $('<div class="firstcontainer"><table class="firstcolumn"></table></div>').insertBefore($parent);
        $parent.height($(this).height());
        $parent.addClass('mobile');
        $scrollparent.height($(this).height());
        $scrollparent.children(".firstcontainer").height($(this).height());
        $scrollparent.children(".firstcontainer").children('.firstcolumn').height($(this).height());
        $('.firstcolumn').append(leftTable);
      });
    }
  }

  function destroyMobileTables() {
    $('table.responsive').each(function(i, currentTable) {
      var $parent = $(this).parent();
      var $scrollparent = $parent.parent();
      $scrollparent.children('.firstcontainer').remove();
      $parent.height('auto');
        $parent.removeClass('mobile');
      $scrollparent.height('auto');
    });
  }

  mobileTables();

  $(window).resize(function() {
    if (window.innerWidth > 959) {
      if ($('table.firstcolumn').length > 0) {
        destroyMobileTables();
      }
    } else {
      if ($('table.firstcolumn').length === 0) {
        mobileTables();
      }
    }
  });

})(jquery);



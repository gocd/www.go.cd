/*
 Reference: http://jsfiddle.net/BB3JK/47/
 */

jQuery(document).ready(function () {
  $(".download-nav li").on("click", function () {

    $('.select-dropdown').each(function () {
      var $this = $(this), numberOfOptions = $(this).children('option').length;

      $this.addClass('select-hidden');
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');

      var $styledSelect = $this.next('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());

      var $list = $('<ul />', {
        'class': 'select-options'
      }).insertAfter($styledSelect);

      for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
        }).appendTo($list);
      }

      var $listItems = $list.children('li');

      $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
          $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
      });

      $listItems.click(function (e) {
        e.stopPropagation();
        var previous_text = $styledSelect.text();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        var previously_selected_row = "table ." + previous_text;
        var current_selected_row = "table ." + $styledSelect.text();

        $styledSelect.closest('.table-c').find(previously_selected_row).hide();
        $styledSelect.closest('.table-c').find(current_selected_row).show();
        //console.log($this.val());
      });

      $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
      });
    });

    $('.table-c').each(function () {
      $(this).find('tr:gt(1)').each(function () {
        var $this = $(this);
        $this.hide();
      });
    });
  });
});
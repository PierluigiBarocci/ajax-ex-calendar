$(document).ready(function(){

var template_html = $("#day-template").html();
var template_function = Handlebars.compile(template_html);

var starting_point = '2018-01-01';
var starting_moment = moment(starting_point);

month_Generator(starting_moment);
checking_Holidays(starting_moment);

$('#month_next').click(function(){
    $('#month_section').empty();

    starting_moment.add(1, 'months');

    month_Generator(starting_moment);
    checking_Holidays(starting_moment);
});

$('#month_prev').click(function(){
    $('#month_section').empty();

    starting_moment.subtract(1, 'months');

    month_Generator(starting_moment);
    checking_Holidays(starting_moment);
});


function month_Generator(date) {
    var cloning_month = moment(date);
    checking_valid_month(date.month());
    var textual_month = cloning_month.format('MMMM');
    var total_days = cloning_month.daysInMonth();
    for (var i = 1; i <= total_days; i++) {
        var properties = {
            day: date_formatting(i),
            month: textual_month,
            data_day: cloning_month.format('YYYY-MM-' + date_formatting(i))
        };
        var final = template_function(properties);
        $('#month_section').append(final);
        $('#current_month').text(textual_month);
    }
};

function date_formatting(num) {
    if (num < 10) {
        num = '0' + num;
        return num;
    } else {
        return num;
    }
};

function checking_Holidays(date) {
    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/holidays?',
        'method': 'GET',
        'data': {
            'year': 2018,
            'month': date.month()
        },
        'success': function(data){
            var array_month = data.response;
            for (var i = 0; i < array_month.length; i++) {
                var date_holiday = array_month[i].date;
                var name_holiday = array_month[i].name;
                $('#month_section li[data-day="' + date_holiday + '"]').addClass('holiday').append(' - ' + name_holiday);
            }
        },
        'error': function(){
            alert('error');
        }
    })
};

function checking_valid_month(num_of_month) {
    // $('#month_prev').removeClass('deactivate');
    // $('#month_next').removeClass('deactivate');
    $('#month_prev').prop('disabled', false);
    $('#month_next').prop('disabled', false);
    if (num_of_month == 0) {
        // $('#month_prev').addClass('deactivate');
        $('#month_prev').prop('disabled', true);
    } else if (num_of_month == 11) {
        // $('#month_next').addClass('deactivate');
        $('#month_next').prop('disabled', true)
    }
};

})

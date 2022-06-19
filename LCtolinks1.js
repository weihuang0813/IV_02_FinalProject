//okay
function tolinks(finalObj, startDate, endDate) {
    // console.log("Test tolinks");
    var links = [];
    stock_id = ['2330', '2454', '2317', '2308', '2303', '2881', '1301', '1303', '2882', '2002', '2412', '2891', '3711', '2886', '1216', '2884', '3008', '2885', '3034', '1326', '2357', '1101', '5871', '2379',
        '2382', '2327', '2892', '5880', '6415', '2207', '2880', '3045', '2887', '6505', '2912', '5876', '4938', '1590', '2395', '2474', '1402', '1102', '2801', '9910', '4904', '2105', '6669', '8046', '2408', '2633']

    //access every 1225
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var lower_index = 0;
    var upper_index = 0;
    while (count1 < 50) {
        if ((count1 + 1) < 50)
            count2 = count1 + 1;
        else if ((count1 + 1) == 50)
            break;
        while (count2 < 50) {
            var string = "";
            string = stock_id[count1] + '-' + stock_id[count2];

            //access single pare in 1225
            //find lower bound
            lower_index = lowerbound(finalObj[string][0].date_lower, startDate);

            //find upper bound
            upper_index = upperbound(finalObj[string][0].date_upper, endDate);

            if (lower_index == -1 || upper_index == -1) {
                return null;
            }

            //compute every single link
            var sum = 0;
            for (elem in finalObj[string][0].related_rate) {
                sum += finalObj[string][0].related_rate[elem];
            }
            if (sum <= 0) {
                sum = sum * -1;
            }
            sum = Math.round(sum);
            //append to links
            var oneLink = [];

            //discard too small relationship links
            if (sum > 150)
                ;
            else {
                oneLink = { "source": stock_id[count1], "target": stock_id[count2], "value": sum };
                links.push(oneLink);
            }
            // console.log(oneLink);
            

            count2 += 1;
            count3 += 1;
        }
        count1 += 1;
    }

    return links;
}

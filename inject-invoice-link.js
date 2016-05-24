
function getInvoiceUrl(order) {
    
    var username = $('li.username a').html();
    
    return 'https://secure.skype.com/users/' + username
            + '/payment/orders/' + order + '/invoice?regenerate=true';
}

var path = window.location.pathname;
var pattern = /\/wallet\/account\/orders\/([0-9]+)/;

var matches = path.match(pattern);

// Single order page.
if (matches) {
    
    // Invoice does only exist if the order is delivered.
    var order_delivered = $('td#order-details-DELIVERED');
    
    if (order_delivered.length > 0) {

        $('#pageContainer').append(
            '<p style="margin-top: .5em">' +
                'Download invoice in <a href="' + getInvoiceUrl(matches[1]) + '">PDF-Format</a>' +
            '</p>'
        );
    }
} 
// Order list.
else {
    
    // Add a new column at the end for the invoice links.
    $('#purchaseList thead tr').append('<th>Invoice</th>');
    
    // foreach row, add a column to the end with a download link.
    $('#purchaseList tbody tr').each(function (i, row) {
        
        var $row = $(row),
            status = $.trim($($row.find('.status')).html()),
            content = '<td>-</td>';
        
        // Invoice does only exist if the order is delivered.
        if (status == 'Delivered') {
            // Find the orderId for this row.
            var row_orderId = $($row.find('.orderId a')[0]).html();
            
            content = '<td><a href="' + getInvoiceUrl(row_orderId) + '">PDF</a></td>';
        }
        
        $row.append(content);
    });
}

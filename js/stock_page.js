
// Create our number formatter.
var currFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


function enter_input() {
    document.getElementById('input').value = "";
    document.getElementById('input').style.color = "black";
}


function collect_data() {

    var content = document.getElementById("stock__project--stock-content");

    content.innerHTML = "";

    var ticker = (document.getElementById('input').value).trim().toUpperCase();
    var url = "https://finnhub.io/api/v1/quote?symbol=" + ticker +"&token=bqtj2pnrh5re54um1htg";
    console.log(url);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(null);

    xhr.onload = function() {
        if (xhr.status == 200) {
            responseObject = JSON.parse(xhr.responseText);

            if (responseObject.c != 0) {
                var tick = document.createElement('h2');
                tick.classList.add("ticker-symbol")
                tick.innerText = ticker;
                content.appendChild(tick);

                var price = document.createElement('h4');
                price.innerText = "Price: " + currFormatter.format(responseObject.c);
                content.appendChild(price);

                var change = document.createElement('h4');
                change.innerText = "Today's change: "+ currFormatter.format(responseObject.d);
                content.appendChild(change);

                var percChange = document.createElement('h4');
                var pc = Number(responseObject.dp/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}); 
                percChange.innerText = "Today's % change: " + pc;
                content.appendChild(percChange);


                console.log(responseObject);
            } else {
                var errorMsg = document.createElement('span');
                errorMsg.innerText = "Invalid ticker symbol: "+ticker+" is not a valid ticker."
                errorMsg.style.color = "red";           // should put styling in CSS (add to class list here)
                content.appendChild(errorMsg);
            } 


        } else {
            console.log("bad")
        }
    }

}
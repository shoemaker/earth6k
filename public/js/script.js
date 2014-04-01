document.addEventListener('DOMContentLoaded', function(){
    var links = document.getElementsByTagName('a');
    for (var ii=0; ii<links.length; ii++) {
        links[ii].setAttribute('target', '_blank');
    }
});


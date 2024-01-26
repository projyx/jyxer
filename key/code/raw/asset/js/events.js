window.events = {} 
window.events.onclick = {}
window.events.onclick.document = async function(event) {
    var target = event.target;
    var elem = target;

    Array.from(document.querySelectorAll('.modal')).forEach(elem=>{
        elem.remove();
    }
    );

    elem = target.closest('[href]');
    if (elem) {
        event.preventDefault();
        var href = elem.getAttribute('href');
        //console.log(47, href);
        rout.er(href);
    }

    elem = target.closest('dropdown');
    if (elem) {
        var drop = elem.querySelector('[drop="down"]');
        if (drop) {
            if (drop.nextElementSibling.classList.contains('active')) {
                Array.from(document.querySelectorAll('dropdown [drop="down"]')).forEach(el=>{
                    el.nextElementSibling.classList.remove('active');
                }
                );
                drop.nextElementSibling.classList.remove('active');
            } else {
                drop.nextElementSibling.classList.add('active');
            }
        } else {
            drop.nextElementSibling.classList.toggle('active');
        }
    } else {
        Array.from(document.querySelectorAll('dropdown [drop="down"]')).forEach(elem=>{
            elem === elem.closest('dropdown:has(ul.active)') ? null : elem.nextElementSibling.classList.remove('active');
        }
        );
    }
}
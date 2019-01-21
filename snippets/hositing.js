var demo = 'Hello';
function getDemo(demo) {
    var test = function () {
        return demo + ' My friend';
    };
    demo = demo + ' how are you';
    return test();
}

console.log(getDemo('hi'));
demo = 'hey';
/**
 * Created by Romany Saad [contact.romany-saad.com] on 16/08/2015.
 */

function NativeSlider ( el, width, height ){
    var currentIndex = 0;
    var container = el;

    container.style.width = width;
    container.style.height = height;
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.boxSizing = "border-box";

    var wrapper = container.firstElementChild;
    if(wrapper == null){
        throw  Error("no child element found to use as a wrapper");
    }

    wrapper.style.width     = wrapper.childNodes.length * width + "px";
    wrapper.style.height    = height + "px";
    wrapper.style.left      = 0;
    wrapper.style.position  = "absolute";

    function _getCurrentIndex(){return currentIndex;}
    function _getContainer(){return container;}
    function _getWrapper(){return wrapper;}

    this.getCurrentIndex = function () {return _getCurrentIndex()};
    this.getContainer = function () {return _getContainer()};
    this.getWrapper = function(){return _getWrapper();};

    this.goTo = function(index) {
        index = Math.floor(index);
        var wrapper = this.getWrapper();
        var slides = wrapper.children;
        if (index < slides.length && index >= 0) {
            var currentSlide = slides[index];

            wrapper.style.left = -currentSlide.offsetLeft + "px";
            slides[currentIndex].classList.remove("_ns_active_slide");
            currentSlide.classList.add("_ns_active_slide");

            this.getContainer().dispatchCustomEvent("slided",{
                from:slides[currentIndex],
                to:slides[index] ,
                fromIndex : currentIndex,
                toIndex: index
            });
            currentIndex = index;

        }
    };
    this.goTo(0);
}


NativeSlider.prototype.next = function(){
    this.goTo(this.getCurrentIndex()+1);
};

NativeSlider.prototype.previous = function(){
    this.goTo(this.getCurrentIndex()-1);
};

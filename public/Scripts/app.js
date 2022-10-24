// IIFE --immediately invoked function expression

(function(){
    function Start()
    {
        console.log("App has started");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for (button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Click 'OK' to delete Permanently?")){
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            })
        }
    }

   
    window.addEventListener("load", Start);
    
})();
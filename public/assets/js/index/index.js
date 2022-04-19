$(document).ready(function(){


    $("#delete-heroes").on('click',function(e){
      e.preventDefault();   

      if(confirm("Estas seguro que deseas eliminar este heroe?")){
          $("#form-delete").submit();
      }

    });

});

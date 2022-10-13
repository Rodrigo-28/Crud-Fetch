import { helpHttp } from "./helpHttp.js";

const d= document,
$table =d.querySelector(".crud-table"),
$form= d.querySelector(".crud-form"),
$title=d.querySelector(".crud-title"),
$template=d.getElementById("crud-template").content,
$fragment=d.createDocumentFragment();


const url="http://localhost:3000/Empresa/";
const getAll=async()=>{
    try {
       const res= await helpHttp().Get(url);

       console.log(res);
       res.forEach(el => {
        $template.querySelector(".name").textContent=el.nombre;
        $template.querySelector(".impuestos").textContent=el["valor de impuesto"];
        $template.querySelector(".pagaImpuesto").textContent=el["valor de impuesto"]> 90000 ? "SI" :"NO";
        $template.querySelector(".edit").dataset.id=el.id;
        $template.querySelector(".edit").dataset.name=el.nombre;
        $template.querySelector(".edit").dataset.impuesto=el["valor de impuesto"];
        $template.querySelector(".delete").dataset.id=el.id;
        $template.querySelector(".delete").dataset.name=el.nombre;


        let $clone=d.importNode($template,true);
        $fragment.appendChild($clone);
    });
     $table.querySelector("tbody").appendChild($fragment);
        
    } catch (err) {

        $table.insertAdjacentHTML("afterend",`<p><b>${err.status}:${err.statusText}</b></p>`);

        
    }
}

d.addEventListener("DOMContentLoaded",getAll);

d.addEventListener("submit",async e=>{
    if(e.target ===$form){
        e.preventDefault();

        if(!e.target.id.value){
            try {
                let option={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json;charset=utf-8",

                    },
                    body:{
                        nombre:e.target.nombre.value,
                        ["valor de impuesto"]:e.target.impuesto.value

                    },

                    
                };
                let res=await helpHttp().Post(`${url}`,option)
               location.reload();
                
            } catch (err) {
                $table.insertAdjacentHTML("afterend",`<p><b>${err.status}:${err.statusText}</b></p>`);

            }
        }else{
            try {
                let option={
                    method:"PUT",
                    headers:{
                        "Content-type":"application/json;charset=utf-8",
                    },
                    body:{
                        nombre:e.target.nombre.value,
                        ["valor de impuesto"]:e.target.impuesto.value
                    }
                    
                }
                let res =await helpHttp().Put(`${url}${e.target.id.value}`,option);
                location.reload();
                
            } catch (err) {
                $table.insertAdjacentHTML("afterend",`<p><b>${err.status}:${err.statusText}</b></p>`);

            }
        }
    }
});

d.addEventListener("click",async e=>{
    if(e.target.matches(".edit")){
        $title.textContent="editar empresa";
        $form.nombre.value=e.target.dataset.name;
        $form.impuesto.value=e.target.dataset.impuesto;
        $form.id.value=e.target.dataset.id;

    }
    if(e.target.matches(".delete")){
        alert("presionaste el boton de eliminar");
        let isDelete=confirm(`Estas seguro que quieres eliminar la empresa :  ${e.target.dataset.name}`);
        if(isDelete){
            try {
                let option={
                    method:"DELETE",
                    headers:{
                        "Content-type":"aplication/json;charset=utf-8"
                    }
                }
                let res= await helpHttp().Del(`${url}${e.target.dataset.id}`,option);
                location.reload();

            } catch (err) {
              $table.insertAdjacentHTML("afterend",`<p><b>${err.status}:${err.statusText}</b></p>`);

            }
        }
    }
})


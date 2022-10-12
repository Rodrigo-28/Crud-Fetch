import { helpHttp } from "./helpHttp.js";

const d= document,
$table =d.querySelector(".crud-table"),
$form= d.querySelector(".crud-form"),
$title=d.querySelector(".crud-title"),
$template=d.getElementById("crud-template").content,
$fragment=d.createDocumentFragment();
// console.log($table);
// console.log($form);
// console.log($title);
// console.log($template);
// console.log($fragment);

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
                console.log(option.body)
                let res=await helpHttp().Post(`${url}`,option)
               // location.reload();
                
            } catch (error) {
                $table.insertAdjacentHTML("afterend",`<p><b>${err.status}:${err.statusText}</b></p>`);

            }
        }
    }
})


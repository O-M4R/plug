const plugs = [
	{modelo:"29108-004", color:"Gold",},
	{modelo:"29108-005", color:"Silver"},
	{modelo:"29108-007", color:"Black"},
	{modelo:"44021-004", color:"Gold",},
	{modelo:"44021-005", color:"Silver"},
	{modelo:"44021-007", color:"Black"},
	{modelo:"62038-003", color:"Gold"},
	{modelo:"62038-004", color:"Silver"},
	{modelo:"62038-005", color:"Black"},
	{modelo:"62039-001", color:"Silver"},
	{modelo:"62039-002", color:"Gold"},
	{modelo:"62039-003", color:"Black"},
	{modelo:"64884-003", color:"Gold"},
	{modelo:"64884-004", color:"Silver"},
	{modelo:"64884-005", color:"Black"},
	{modelo:"15835-005", color:"Gold"},
	{modelo:"15835-006", color:"Silver"},
	{modelo:"15835-007", color:"Black"},
	{modelo:"15836-005", color:"Gold"},
	{modelo:"15836-006", color:"Silver"},
	{modelo:"15836-007", color:"Black"}
	];
var listaPlugs;
var listaOrden = [];

const myOnLoad=()=>{
	cargarModelos();
}

const cargarModelos=()=>{
	listaPlugs = plugs;
	let select = document.getElementById("modelos");
	let option;
	for(plug in listaPlugs){
		option = document.createElement("option");
		option.text = listaPlugs[plug].modelo;

		select.add(option);
	}
}

const agregarModelo=()=>{
	console.log("Agregando modelo");
	modelo = document.getElementById("modelos").value;
	cantidad = document.getElementById("cantidad").value;
	if(modelo === "Seleccionar modelo")
	{
		console.error("Error Modelo");
		mostrarMensaje("agregarModelo-msj","Seleccione un modelo","alert-danger");
		return;
	}
	if(cantidad<1){
		console.error("Error Cantidad")
		mostrarMensaje("agregarModelo-msj","Error al ingresar la cantidad","alert-danger");
		return;
	}

	//Agregamos el modelo agregado a la lista
	listaPlugs.forEach((plug)=>{
		
		if(plug.modelo === modelo)
		{
			console.log("Agregando plug a lista orden")

			listaOrden.push({"plug": plug, "cantidad": cantidad} );
		}
	});



	document.getElementById("formAgregarModelo").reset();
	mostrarMensaje("agregarModelo-msj", "Modelo agregado a orden","alert-primary");
	
	mostrarListadoOrden();
	//actualizarModelos();

}

const actualizarModelos=(modelo)=>{
	let select = document.getElementById("modelos");
	let option;


	listaPlugsDisponibles.forEach((plug)=>{
		if(plug.modelo === modelo){

		}
	})




/*
	for(plug in plugs){
		console.log("ITEM " + plugs[plug] + " <> " + plug.modelo + " -- " + modelo);
		if(plug.modelo === modelo)
		{
			console.error("break");
			break;
		}
		else
		{
			console.log("actualizado")
			option = document.createElement("option");
			option.text = plugs[plug].modelo;
			select.add(option);
		}	

	}*/

}
const mostrarListadoOrden=()=>{

	
	let listadoHTML = ``;
	console.log(listaOrden.length);
	let cont = 0;
	let sumaRacks = 0;
	listaOrden.map(orden=>{
		cont++;
		let racks;
		let cajas;
		let residuo = orden.cantidad%105;
		if(residuo !== 0)
		{
			racks = Math.trunc(orden.cantidad/105) + 1;
			cajas = Math.trunc(racks / 7);
		}
		else
		{
			racks = orden.cantidad/105;
			cajas = racks / 7;
		}
		sumaRacks += racks;
		
		listadoHTML += `<div id="modelo" class="card-orden mb-4">
							<div class="row">
								<div class="col-5 campo-titulo">
									<strong >Modelo:</strong>
								</div>
								<div class="col-4 campo-titulo">
									<strong>Color:</strong>
								</div>	
								<div class="col-3 campo-titulo">
									<strong>Piezas:</strong>
								</div>		
							</div>
							<div class="row">
								<div class="col-5 campo">
									<small>${orden.plug.modelo}</small>
								</div>
								<div class="col-4 campo">
									<small>${orden.plug.color}</small>
								</div>	
								<div class="col-3 campo">
									<small>${orden.cantidad}</small>
								</div>		
							</div>
							<div class="row mt-2">
								<div class="col-4 campo-titulo">
									<strong>Racks:</strong>
								</div>
								<div class="col-8 campo-titulo">
									<strong>Cajas:</strong>
								</div>	
							</div>
							<div class="row">
								<div class="col-4 campo">
									<small>${racks}</small>
								</div>
								<div id="cajas" class="col-8 campo">`;

								if(residuo === 0){
									listadoHTML += `<small>${cajas}/735</small></div>
							</div>`;
								}
								else{
									listadoHTML += `<div class="row">
									<div class="col-6 campo"><small>${cajas}/735</small></div>
													<div class="col-6 campo"><small>1/${residuo}</small></div></div></div>
							</div>`;
								}
								if(cont === listaOrden.length){
									listadoHTML += `<div class="row mt-2"><div class="col-6 campo-titulo"><strong>Total de racks:</strong></div><div class="col-6 campo"><small>${sumaRacks}</small></div></div>`;
								}
			listadoHTML += `		
						</div>`;



		
		
	});
	document.getElementById("listadoPlug").innerHTML = listadoHTML;
}



const mostrarMensaje=(elemento,mensaje,tipo)=>{
	let divMensaje = document.getElementById(elemento);
	divMensaje.innerHTML = `<div class="alert ${tipo} mb-2" role="alert">${mensaje}</div>`;
	setTimeout(()=>{divMensaje.innerHTML=``;}, 2000);
}

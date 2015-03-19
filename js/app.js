
	

	var model = {

		currentCat: null,

	cats: [

	{	
		name: 'Michael',
		clicks: 0,
		imageSrc: 'img/cat.jpg',
		showAdminView: true
	},{ 
		name: 'Magic',
		clicks: 0,
		imageSrc: 'img/cat2.jpg',
		showAdminView: true

	},{ 
		name: 'Kareem',
		clicks: 0,
		imageSrc: 'img/cat3.jpg',
		showAdminView: true

	},{ 
		name: 'Hakeem',
		clicks: 0,
		imageSrc: 'img/cat4.jpg',
		showAdminView: true

	},{ 
		name: 'Charles',
		clicks: 0,
		imageSrc: 'img/cat5.jpg',
		showAdminView: true

	}


	]

}

	var octopus ={

		init: function(){
			model.currentCat= model.cats[0];
			catView.init();
			catListArea.init();
			adminView.init();
		},

		addClicks: function(){
			model.currentCat.clicks++;
			catView.render();
		},

		getCurrentCat: function(){
			return model.currentCat;
		},
		getCats: function(){
			return model.cats;
		},

		setCurrentCat: function(cat){
				model.currentCat= cat;
		},

		openAdminView: function(){
			if(model.currentCat.showAdminView){
				adminView.render();
				model.currentCat.showAdminView=false;
			}
		},

		closeAdminView: function(){
			adminView.editName.innerHTML="";
			adminView.editClicks.innerHTML="";
			adminView.editUrl.innerHTML="";
			adminView.cancel.innerHTML="";
			adminView.save.innerHTML="";
			model.currentCat.showAdminView=true;
		},

		saveChanges: function(){
			model.currentCat.name = adminView.nameInput.value;
			model.currentCat.imageSrc = adminView.urlInput.value;
			model.currentCat.clicks = adminView.clicksInput.value;
			catView.render();
			catListArea.catlistPlace.innerHTML=""
			catListArea.render();
			adminView.editName.innerHTML="";
			adminView.editClicks.innerHTML="";
			adminView.editUrl.innerHTML="";
			adminView.cancel.innerHTML="";
			adminView.save.innerHTML="";
			model.currentCat.showAdminView=true;
		}
	}


	var catView = {

		init: function(){
			this.catName=document.getElementById('name');
			this.catClicks=document.getElementById('clicks');
			this.catImage=document.getElementById('photo');
			this.catImage.addEventListener('click', function(){

				octopus.addClicks();

			});

			this.render();
		},

		render: function(){

			var currentCat= octopus.getCurrentCat();
				this.catName.textContent= currentCat.name;
				this.catClicks.innerHTML= currentCat.clicks;
				this.catImage.src= currentCat.imageSrc;

		}



	}

	var catListArea = {

		init: function(){

			this.catlistPlace=document.getElementById('catlist');

			this.render();
		},

		render: function(){

			var cats= octopus.getCats();

			var elem, cat ,i;

			for (i = 0 ; i < cats.length; i++) {

				cat=cats[i];
				elem= document.createElement('li');
				elem.textContent= cat.name;

				elem.addEventListener('click', (function(copyOfCat){

					return function(){
					octopus.setCurrentCat(copyOfCat);
					adminView.editName.innerHTML="";
					adminView.editClicks.innerHTML="";
					adminView.editUrl.innerHTML="";
					adminView.cancel.innerHTML="";
					adminView.save.innerHTML="";
					model.currentCat.showAdminView=true;
					catView.render();
				}	
					}
						
					)(cat));

				this.catlistPlace.appendChild(elem);


			}

		}
	};

	var adminView = {
		init: function(){

				//initialize clickable items

				this.admin= document.getElementById('admin');
				this.admin.addEventListener('click', function(){

						octopus.openAdminView();

					
					
				});

				this.cancel= document.getElementById('cancel');
				this.cancel.addEventListener('click',function(){
					octopus.closeAdminView();

				});
				this.save= document.getElementById('save');
				this.save.addEventListener('click',function(){
					octopus.saveChanges();
				});
				

				//initialize inputs

				this.editName=document.getElementById('txt_name');				
				this.editClicks=document.getElementById('number');
				this.editUrl=document.getElementById('imageUrl');
					
				

		},

		render: function(){


				var currentCat= octopus.getCurrentCat();

				// create elements for the admin view
				var nameNode = document.createElement('p');
					nameNode.innerHTML= "Name:";
				var clicksNode = document.createElement('p');
					clicksNode.innerHTML= "#clicks:";
				var urlNode = document.createElement('p');
					urlNode.innerHTML="ImageUrl:"

				var cancelButton= document.createElement('input');
				cancelButton.type= 'submit';
				cancelButton.value= "cancel";

				var saveButton= document.createElement('input');
				saveButton.type= 'submit';
				saveButton.value= "save";

				// create inputs for paragraph elements 
				
				var nameInput= document.createElement('input');
				nameInput.type= 'text';
				nameInput.value= currentCat.name;

				var clicksInput= document.createElement('input');
				clicksInput.type= 'text';
				clicksInput.value= currentCat.clicks;

				var urlInput= document.createElement('input');
				urlInput.type= 'text';
				urlInput.value= currentCat.imageSrc;

				//append the new element nodes

				this.editName.appendChild(nameNode);
				nameNode.appendChild(nameInput);
				this.nameInput=nameInput; 

				this.editClicks.appendChild(clicksNode);
				clicksNode.appendChild(clicksInput);
				this.clicksInput=clicksInput; 

				this.editUrl.appendChild(urlNode);
				urlNode.appendChild(urlInput);
				this.urlInput=urlInput; 

				this.cancel.appendChild(cancelButton);

				this.save.appendChild(saveButton);

				
		}

	}


octopus.init();
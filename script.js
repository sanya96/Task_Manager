
document.querySelector("#adTask").addEventListener("click", newTask);
document.querySelector("#assignedTask").addEventListener("click", assignedTasks);
document.querySelector("#completTask").addEventListener("click", completedTasks);


var main = document.querySelector("main");
var tasks = [];
var rez2 = [];


if (localStorage.getItem("toDo") != undefined) 
{
	tasks = JSON.parse(localStorage.getItem("toDo"));
	assignedTasks();
}
else 
{
	main.innerHTML = "<h2>Assigned task is empty!</i></h2>";
}

if(localStorage.getItem("complet") != undefined)
{
	rez2 = JSON.parse(localStorage.getItem("complet"));
}

function newTask()
{
	main.innerHTML = "<fieldset><input type='text' id='addTask' placeholder='input your task'><input type='button' id='add' value='Add' autofocus></fieldset>";

	var add = document.querySelector("#add");
	var input = document.querySelector("#addTask");
	 
	add.addEventListener("click", function()
		{
			
			if (input.value && input.value != " ") 
			{	
				tasks[tasks.length] = input.value;		
			
				localStorage.setItem( "toDo", JSON.stringify(tasks) );
				
				main.innerHTML = "<h2>Task Successfully Added<i class='fa fa-check addIcon' aria-hidden='true'></i></h2>";
			}
			else
			{
				alert("Field can not be empty!");	
			}
			
		});
}


function assignedTasks()
{		
	if(localStorage.getItem("toDo") == undefined || localStorage.getItem("toDo") == "[]") 
		{
			main.innerHTML = "<h2>Assigned task is empty!</h2>";
		}
	else
	{	
		for(var i = 0; i < tasks.length; i++)
		{
			var out = "";
			out += "<ol id='tasksContainer'>";

			for(let i = 0; i < tasks.length; i++)
			{
				out += "<li class='output'>" + tasks[i] +"<span class='spanCheck' ><input type='checkbox' class='checkbox'>complet</span></li>";
			}

			out += "</ol>";
			main.innerHTML=out;

			var arr = document.querySelectorAll(".checkbox");

			for(var i = 0; i < arr.length; i ++)
			{
				arr[i].onclick = completet;
			}
				
				
			function completet ()
			{	
		
				var elem  = event.target.parentElement.parentElement.childNodes[0].textContent;
					
				rez2[rez2.length] = elem;

				localStorage.setItem( "complet", JSON.stringify(rez2) );

				localStorage.removeItem("toDo");
				tasks.splice(tasks.indexOf(elem), 1)

				localStorage.setItem( "toDo", JSON.stringify(tasks));	
				main.innerHTML = "<h2>Task Successfully complet<i class='fa fa-check addIcon' aria-hidden='true'></i></h2>";
				
			}

		}
	}
}
	

function completedTasks()
{
	if(localStorage.getItem("complet") == undefined || localStorage.getItem("complet") == "[]") 
	{
		main.innerHTML = "<h2>Completed task is empty!</h2>";
	}
	else
	{
		var out = "";
		var res = '';

		res = JSON.parse(localStorage.getItem("complet"));
		out += "<ol id='tasksContainer'>";

		for(var i = 0; i < res.length; i++)
		{
			out += "<li class='output'>" + res[i] + "<i class='fa fa-trash-o rightIcon' aria-hidden='true' onclick='Del()'></i></li>";
		}

		out += "</ol>";

		main.innerHTML = out;
	}
}


 function Del(){
 
	 localStorage.removeItem("complet");

	 let deleteElem  = event.target.parentElement.parentElement.childNodes[0].textContent;
						
		
	 rez2.splice(rez2.indexOf(deleteElem), 1);

	 localStorage.setItem( "complet", JSON.stringify(rez2));	
		
	 main.innerHTML = "<h2>Task Successfully delete <i class='fa fa-check addIcon' aria-hidden='true'></i></h2>";
					
 }

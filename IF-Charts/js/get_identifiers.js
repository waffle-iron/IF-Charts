<script>
	String[] lines = TextArea.getText().split("\n");
	String departure = "";
	departure=lines[0];
	String arrival = "";
	arrival=lines[1];
	alert(departure);
	document.getElementById("dept").innerHTML = departure;
	document.getElementById("dest").innerHTML = arrival;
</script>
<div id="page-wrap">
	<header class="main" id="h1">
		<% if(!session.user) %>
			<span class="right"><a href="/login">login</a></span>
		<% }else{ %>
			<span class="right"><% session.user.username %><a href="/login">logout</a></span>
		<% } %>

		<h2>Quiz<span>: el juego de las preguntas </span></h2>
	</header>
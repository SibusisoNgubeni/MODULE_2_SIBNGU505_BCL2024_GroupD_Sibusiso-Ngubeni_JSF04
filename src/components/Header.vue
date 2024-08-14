<script>

</script>

<template>
<header>
  <nav class="container">
    <div class="logo"> 
      <img src="../assets/planet-5-logo.png" class="logo" alt="planet Logo">
    </div>
    <ul class="nav-menu">
      <li><a href="#"></a></li>
      <li><a href="#">ProductS</a></li>
      <li><a href="#">Offers</a></li>
      <li><a href="#">Categoreies</a></li>
      <li><a href="#">wishlist</a></li>
      <li><a href="#">cart</a></li>
    </ul>
    <div class="hamburger-menu">&#9776;</div>

    <div class="login">
      login
    </div>
  </nav>
</header>
 
</template>

<style scoped>
  header {
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  height: 96px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  
}

.logo {
 width: 250px;
 height: 70px;
 border-radius: 10px;
}

.nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-menu li {
  margin-right: 20px;
}

.nav-menu a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: #ffd700;
}


@media screen and (max-width: 768px) {
  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: #333;
    width: 100%;
    text-align: center;
  }

  .nav-menu li {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .nav-menu a {
    padding: 10px;
    display: block;
  }

  .hamburger-menu {
    display: block;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>

<script setup lang="ts"></script>

<template>
    <NuxtLayout />
</template>

<style>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    direction: none;
}
body {
    font-family: "Poppins", sans-serif;
}

html {
    font-size: 12px;
    color: #333;
    background-color: #f4f5f5;
}

a {
    text-decoration: none;
}

::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb{
  border-radius: 1em;
  background-color: rgba(50,50,50,.3);
}

::-webkit-scrollbar-track{
  border-radius: 1em;
  background-color: rgba(50,50,50,.1);
}
</style>

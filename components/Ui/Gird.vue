<template>
    <div class="md:py-20 md:px-12 grid grid-cols lg:grid-cols-2 xl:grid-cols-3 gap-10">

      <div 
      class="rounded-md p-4 gradient-border shadow-lightBox dark:shadow-darkBox"
      v-for="i in 8">
        <div class="h-30 flex flex-col">
            <div class="flex h-25">
                <div class="flex justify-center items-center"><img src="https://dummyimage.com/80x80?text=Ai" class="rounded-full"/></div>
                <div>
                    <h1 class="font-medium text-2xl pl-3">Title</h1>
                    <div class="pl-4 pt-1">desc</div>
                </div>    
            </div>
            <div class="h-5 flex items-end">
                <div><n-rate allow-half /></div>
            </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.gradient-border {
  @apply relative rounded-md w-[100%] backdrop-filter backdrop-blur-lg
}

.gradient-border {
  @apply dark: bg-dark-400/20
}

.gradient-border::before {
  @apply dark: bg-darkBorder bg-lightBorder
}

.gradient-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.375rem;
  padding: 1px;
  width: 100%;
  background-size: 400% auto;
  background-position: 0 0;
  opacity: 0.5;
  transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
  -webkit-mask: linear-gradient(#1D1E22 0 0) content-box, linear-gradient(#1D1E22 0 0);
  mask: linear-gradient(#1D1E22 0 0) content-box, linear-gradient(#1D1E22 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.gradient-border:hover::before {
  background-position: -50% 0;
  opacity: 1;
}
</style>

<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
export default {
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/css/argon.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/vendor/nucleo/css/nucleo.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css' },
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.6.0.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/js/argon.min.js' }
    ]
  }
}
</script>

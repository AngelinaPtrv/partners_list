<script setup lang="ts">
import PartnersList from '@/components/PartnersList.vue'
import Filters from '@/components/Filters.vue'
</script>

<template>
  <div class="container main-page">
    <div class="row">
      <div class="col-12 d-flex flex-column align-items-center justify-center">
        <span class="main-page__title">Где купить</span>
        <span class="main-page__subtitle">Контакты наших партнеров</span>
      </div>
    </div>
    <div class="row" style="margin-top: 62px">
      <div class="col">
        <Filters />
      </div>
      <div class="col">
        <PartnersList />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-page {
  margin-top: 152px;
  max-width: 1296px;
  &__title {
    font-family: 'Gogh-medium', sans-serif;
    font-weight: 500;
    font-size: 46px;
    margin-bottom: 24px;
    line-height: 56px;
  }
  &__subtitle {
    font-size: 20px;
  }
}
</style>

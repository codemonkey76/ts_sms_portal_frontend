<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

const isRouterLink = computed(() => 'to' in attrs);
const isAnchorLink = computed(() => 'href' in attrs);

const linkStyle = "text-primary-600/80 hover:underline font-semibold";

</script>
<template>
  <span>

    <router-link v-if="isRouterLink" :class="linkStyle" v-bind="$attrs">
      <slot></slot>
    </router-link>

    <a v-else-if="isAnchorLink" :class="linkStyle" v-bind="$attrs">
      <slot></slot>
    </a>

    <span v-else :class="linkStyle" v-bind="$attrs">
      <slot></slot>
    </span>
  </span>
</template>

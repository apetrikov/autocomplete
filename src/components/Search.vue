<template>
  <div class="input-container" v-click-away="unfocusInput">
    <icon-base class=" icon left" icon-name="search">
      <icon-search />
    </icon-base>
    <icon-base
      v-if="!fetching && value"
      class="icon pointer right"
      icon-name="cross"
      @click.stop="clear"
    >
      <icon-cross />
    </icon-base>
    <Spinner v-if="fetching" class="icon right" />
    <input
      ref="search"
      class="search"
      :disabled="fetching"
      type="text"
      placeholder="Type anything..."
      :value="value"
      @input="edit"
    />

    <div v-if="focused" class="suggestions">
      <div
        v-for="name in filtered"
        :key="name"
        class="suggestion"
        @click="select(name)"
      >
        <icon-base icon-name="book" class="icon left"><icon-book /></icon-base>
        <span>{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { directive as ClickAway } from "vue3-click-away";

import IconBase from "@/components/IconBase";
import IconSearch from "@/components/icons/IconSearch";
import IconCross from "@/components/icons/IconCross";
import Spinner from "@/components/Spinner";
import IconBook from "@/components/icons/IconBook";

const autocompleteTreshold = 3;

export default {
  name: "Search",
  components: {
    IconBook,
    Spinner,
    IconCross,
    IconBase,
    IconSearch
  },
  directives: {
    ClickAway
  },
  data() {
    return {
      value: "",
      repos: [],
      focused: false,
      fetching: true
    };
  },
  computed: {
    filtered() {
      if (this.value.length < autocompleteTreshold) return [];
      const trimmed = this.value.trim();
      return this.repos.filter(str => str.includes(trimmed));
    }
  },
  methods: {
    edit({ target }) {
      const { value } = target;
      this.value = value;
      this.focused = true;
    },
    clear() {
      this.value = "";
      this.focusInput();
    },
    focusInput() {
      this.$refs.search.focus();
      this.focused = true;
    },
    unfocusInput() {
      this.$refs.search.blur();
      this.focused = false;
    },
    select(name) {
      this.value = name;
      this.unfocusInput();
    }
  },
  mounted() {
    // Github API sorts the array
    const url = "https://api.github.com/orgs/kraftvaerk/repos?sort=full_name";
    fetch(url)
      .then(response => response.json())
      .then(data => data.map(repo => repo.name))
      .then(names => {
        this.repos = names;
        this.fetching = false;
      })
      // We should catch the error in a smarter way
      .catch(e => console.error(e));
  }
};
</script>

<style scoped lang="scss">
@import "../styles/constants";
@import "../styles/mixins";

// Used only in this component
@mixin container {
  width: $search-width;
  height: $search-height;
}

.input-container {
  @include container;
  position: relative;

  .icon {
    position: absolute;
    top: 16px;
  }

  .left {
    left: 16px;
  }

  .right {
    right: 16px;
  }

  .pointer {
    @include pointer;
  }
}

.search {
  @include container;
  @include font;
  letter-spacing: 0.01em;

  padding-left: $pad-left;
  padding-right: $pad-right;

  background: $greylight;
  border: 2px solid $grey;
  box-sizing: border-box;
  border-radius: 100px;

  &::placeholder {
    color: $text-color;
    opacity: 1; // For Firefox
  }

  &:focus {
    outline: none;
    border-color: $accent;
  }
}

.suggestions {
  padding-top: 24px;
  display: flex;
  flex-direction: column;

  .suggestion {
    @include container;
    @include font;
    position: relative;
    background: $greylight;
    border: 1px solid $grey;
    box-sizing: border-box;

    padding-left: $pad-left;
    padding-right: $pad-right;

    display: flex;
    align-items: center;

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:hover {
      @include pointer;
      background: $accent;
      border: 1px solid $accent;
    }
  }
}
</style>

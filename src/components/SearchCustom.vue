<template>
  <div class="wrapper">
    <div class="search__left">
      <div class="search__select" :class="isOpen ? 'search__select--open' : ''" @click="isOpen = !isOpen">
        <p class="select__name">Danh sách tag</p>
        <ul class="search__dropdown">
          <li class="search__option">Tag 1</li>
          <li class="search__option">Tag 2</li>
          <li class="search__option">Tag 3</li>
        </ul>
        <i class="fa" :class="isOpen ? 'fa-chevron-down' : 'fa-chevron-up'" aria-hidden="true"></i>
      </div>
      <input id="key_search" :value="value" autocomplete="off" class="search__input" name="key"
             placeholder="Cho QuizChii biết bạn muốn tìm kiếm gì?"
             @input="$emit('input', $event.target.value)">
    </div>

    <div class="search__image search__right" @click="$emit('submit', $event.target.value)">
      <img src="https://learn.mochidemy.com/svg/search.svg" class="w-100" alt="">
    </div>
  </div>

</template>

<script>
export default {
  name: "SearchCustom",
  props: ['value'],
  data() {
    return {
      isOpen: false,
    }
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
}

.search__left {
  display: flex;
  align-items: center;
}

.search__input {
  height: 40px;
  border: none !important;
  padding: 10px 20px;
  border-radius: 15px !important;
  width: 60%;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &:active {
    box-shadow: none;
  }
}

.search__select {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
  width: 170px;
  background-color: #FFCB09;
  color: #fff;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  cursor: pointer;
  position: relative;
}

.search__select.search__select--open .search__dropdown {
  display: block;
}

.select__name {
  margin-right: 5px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.search__dropdown {
  display: none;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  color: #FFCB09;
  top: 120%;
  left: 0;
  width: 100%;
  border-radius: 5px;
}

.search__image {
  cursor: pointer;
}

.search__image:hover {
  transform: scale(1.1);
}


.search__option {
  padding: 5px 0 5px 45px;
}

.search__option:hover {
  background-color: #FFCB09;
  color: #fff;
}
</style>

<script>
export default {
  name: "SearchCustom",
  props: ['value'],
};
</script>

<template>
  <div class="wrapper">
    <div class="search__left">
      <div class="search__select">
        <p class="select__name">Danh sách tag</p>
        <ul class="search__dropdown">
          <li class="search__option">Tag 1</li>
          <li class="search__option">Tag 2</li>
          <li class="search__option">Tag 3</li>
        </ul>
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
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

<style scoped>
.wrapper {
  background-color: #fff;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
//justify-content: space-around; border-radius: 8px;
}

.search__left {
  display: flex;
  align-items: center;
//justify-content: center; width: 90%; margin-left: 2px;
}

.search__input {
  height: 60px;
  border: none !important;
  padding: 20px 20px;
  border-radius: 15px !important;
  margin-bottom: 5px;
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
  justify-content: space-between;
  align-items: baseline;

  background-color: #FFCB09;
  color: #fff;
  padding: 18px 20px 0 20px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  cursor: pointer;
  position: relative;

}

.select__name {
  padding-right: 5px;
}

.search__dropdown {
  position: absolute;
  list-style: none;
  background-color: #FFCB09;
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
  padding: 5px 0px;
}
</style>

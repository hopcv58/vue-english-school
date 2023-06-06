<template>
  <div class="col-12 title-course text-center bg-white"
       style="padding-top: 50px; position: fixed; top: 68px; z-index: 100; width: 100%;">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="course-item-title bg-white">
          <div class="text-center course-item-header">
            <div class="course-item-button">
              <div class="course-item-button-1"></div>
              <div class="course-item-button-2">
                <p>
                  <slot></slot>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Title",
};
</script>

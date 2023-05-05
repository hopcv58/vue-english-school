<template>
  <div>
    <hero>
      Danh sách đề thi
    </hero>
    <section class="section section-lg pt-lg-0 mt--300">
      <div class="container">
        <basic-elements/>
        <inputs/>
        <custom-controls/>
        <navigation/>
        <javascript-components/>
        <carousel/>
        <icons/>
        <examples/>
        <download-section/>
      </div>
    </section>
  </div>
</template>
<script>
import Hero from "./components/Hero";
import BasicElements from "./components/BasicElements";
import Inputs from "./components/Inputs";
import CustomControls from "./components/CustomControls";
import Navigation from "./components/Navigation";
import JavascriptComponents from "./components/JavascriptComponents";
import Carousel from "./components/Carousel";
import Icons from "./components/Icons";
import Examples from "./components/Examples";
import DownloadSection from "./components/DownloadSection";

export default {
  name: "components",
  components: {
    Hero,
    BasicElements,
    Inputs,
    CustomControls,
    Navigation,
    JavascriptComponents,
    Carousel,
    Icons,
    Examples,
    DownloadSection
  }
};
</script>

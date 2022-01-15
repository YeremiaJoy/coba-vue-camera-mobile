<template>
  <div>
    <div>
      <input
        :id="id"
        class="d-none"
        type="file"
        accept="image/*;capture=camera"
        @change="onChangeFile"
      />
    </div>
    <div v-if="url">
      <img
        :src="this.url"
        alt="no-image"
        style="margin-top: 20px"
        width="250"
        height="250"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "upload-image-dialog",
  data: () => ({
    id: "upload-popup",
    url: "",
  }),
  methods: {
    async onChangeFile(e) {
      // @ts-ignore: Object is possibly 'null'.
      const file = e.target.files[0];
      this.$emit("change", file);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("module", "prePerformanceCheck");
        const fileUrl = await axios.post(
          `https://dev.werkules.systeric.com/api/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.url = fileUrl.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

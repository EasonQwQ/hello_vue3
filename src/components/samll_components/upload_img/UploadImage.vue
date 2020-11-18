<template>
  <div class="clearfix">
    <a-upload
      :action="addImg"
      list-type="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
      :remove="handleRemove"
      :beforeUpload="beforeUpload"
    >
      <div v-if="fileList.length < 8 && !disabled">
        <plus-outlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue';
import { uploadImage } from '../../../util/util';
import { toRaw } from 'vue';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  components: {
    PlusOutlined,
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  props: {
    fileLists: {
      type: Array,
      default: [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // this.fileList = this.fileLists;
    this.fileList = this.fileLists || [];

    // console.log('mounted -> this.fileLists', this.fileLists);
    console.log('this.fileData', this.fileList);
  },
  watch: {
    fileLists(e) {
      this.fileList = e || [];
    },
  },
  methods: {
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      console.log('beforeUpload -> this.fileList', this.fileList);
      this.$emit('imageList', this.fileList);
      return false;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
      this.$emit('imageList', this.fileList);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      console.log('handlePreview -> file', file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        console.log('handlePreview -> file.preview', file.preview);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      console.log('handleChange -> fileList', fileList);
      console.log('changed');
      this.fileList = fileList;
    },
    addImg(e) {
      // uploadImage(e);
      console.log('addImg -> e', e);
    },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

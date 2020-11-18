<template>
  <a-button type="primary" @click="operateActivity({}, 'create')"
    >新增一个活动</a-button
  >
  <br />
  <br />
  <a-table :columns="columns" :data-source="activitiesData" rowKey="id">
    <template v-slot:name="{ text }">
      <a-tooltip>
        <template v-slot:title> {{ text }}</template>
        <div>{{ text }}</div>
      </a-tooltip>
    </template>
    <template v-slot:address="{ text: address }">
      <a-tooltip>
        <template v-slot:title> {{ address }}</template>
        {{ address }}
      </a-tooltip>
    </template>
    <template v-slot:startDate="{ text: date }">
      <a-tooltip>
        <template v-slot:title> {{ formatDate(date) }}</template>
        {{ formatDate(date) }}
      </a-tooltip>
    </template>
    <template v-slot:action="{ text, record }">
      <span>
        <a @click="operateActivity(record, 'watch')">查看</a>
        <a-divider type="vertical"></a-divider>
        <a @click="operateActivity(record, 'update')">修改</a>
        <a-divider type="vertical"></a-divider>

        <a-popconfirm
          title="确定删除?"
          ok-text="是的"
          cancel-text="取消"
          @confirm="operateActivity(record, 'delete')"
        >
          <a>删除</a>
        </a-popconfirm>
      </span>
    </template>
  </a-table>

  <a-modal
    v-model:visible="visible"
    title="活动详情"
    @ok="handleOk"
    width="90%"
  >
    <template v-slot:footer>
      <a-button key="back" @click="() => (visible = false)">
        {{ operateData.buttonCancleText }}
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
        v-if="operateData.showOk || false"
      >
        {{ operateData.buttonOkText }}
      </a-button>
    </template>
    <a-form
      ref="ruleForm"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
    >
      <a-row type="flex" justify="space-around" align="top">
        <a-col :span="8">
          <a-form-item
            label="活动名称"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            name="name"
          >
            <a-input
              v-model:value="formData.name"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
          <a-form-item
            label="参加人数"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            name="totalCount"
          >
            <a-input
              v-model:value="formData.totalCount"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
          <a-form-item
            label="地点"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            name="address"
          >
            <a-input
              v-model:value="formData.address"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
          <a-form-item
            label="描述"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            name="description"
          >
            <a-textarea
              v-model:value="formData.description"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="选择活动报名截止时间"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 20 }"
            labelAlign="left"
            name="date"
          >
            <a-date-picker
              show-time
              placeholder="选择活动报名截止时间"
              :locale="locale"
              v-model:value="formData.activityBeforeDate"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
          <a-form-item
            label="选择活动时间"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 20 }"
            labelAlign="left"
            name="activityDate"
          >
            <a-range-picker
              :show-time="{ format: 'HH:mm' }"
              :locale="locale"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['活动开始时间', '活动结束时间']"
              v-model:value="formData.activityDate"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
          <a-form-item
            label="封面图"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 12 }"
            name="mainImg"
            labelAlign="left"
          >
            <UploadImage
              @imageList="addMianImage($event)"
              :file-lists="formData.mainImg"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
          <a-form-item
            label="详情图"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 12 }"
            name="detailImg"
            labelAlign="left"
          >
            <UploadImage
              @imageList="addDetailImage($event)"
              :file-lists="formData.detailImg"
              :disabled="!!operateData.disabled"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { toRaw, markRaw, isProxy, isReactive } from 'vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import * as api from '../../api';
import UploadImage from '../samll_components/upload_img/UploadImage.vue';
import { getCosImageUrl, uploadImage } from '../../util/util';
import { postApi } from '../../request/http';
const columns = [
  {
    title: '活动名称',
    key: 'name',
    dataIndex: 'name',
    slots: { customRender: 'name' },
    ellipsis: true,
  },
  {
    title: '地点',
    key: 'address',
    dataIndex: 'address',
    ellipsis: true,
    slots: { customRender: 'address' },
  },
  {
    title: '时间',
    key: 'startDate',
    dataIndex: 'startDate',
    slots: { customRender: 'startDate' },
    ellipsis: true,
  },
  {
    title: '当前参与人数',
    key: 'count',
    dataIndex: 'count',
    slots: { customRender: 'count' },
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    width: 200,
  },
];
const operateList = [
  {
    operate: 'update',
    buttonOkText: '确认修改',
    buttonCancleText: '取消',
    showOk: true,
  },
  {
    operate: 'watch',
    buttonCancleText: '关闭',
    showOk: false,
    disabled: true,
  },
  {
    operate: 'create',
    buttonOkText: '确认保存',
    buttonCancleText: '关闭',
    showOk: true,
  },
];
moment.locale('zh-cn');
export default {
  data() {
    return {
      locale, // 国际化配置
      dateFormat: 'YYYY/MM/DD',
      dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
      // value: moment('2015-01-01', 'YYYY-MM-DD'),
      operateData: {},
      activitiesData: [],
      columns,
      visible: false,
      formData: {},
      loading: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
      change: false,
      rules: {
        name: [
          {
            required: true,
            message: '必填',
          },
          {
            min: 2,
            message: '名称最少2个字',
            trigger: 'change',
          },
          {
            max: 50,
            message: '名称最多50个字',
            trigger: 'change',
          },
        ],
        totalCount: [
          {
            required: true,
            message: '必填',
          },
          {
            pattern: /^[0-9]*$/,
            message: '请输入整数',
          },
        ],
        address: [
          {
            required: true,
            message: '必填',
          },
        ],
        description: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
      fileMainList: [],
      fileDetailList: [],
    };
  },
  computed: {},

  mounted() {
    this.getActivities();
  },
  components: {
    UploadImage,
  },
  methods: {
    moment,
    // 添加主图
    addMianImage(e) {
      console.log('addMianImage -> e', e);
      this.fileMainList = e;
    },
    //添加详情图
    addDetailImage(e) {
      this.fileDetailList = e;
    },
    // 获取所有活动
    async getActivities() {
      const activitiesData = await api.getActivities();
      activitiesData.rows.map((v) => {
        v.mainImgStr = v.mainImg;
        v.mainImg =
          v.mainImg &&
          v.mainImg.split(',').map((k) => {
            const j = {};
            j.url = getCosImageUrl() + k;
            j.thumbUrl = j.url;
            j.name = k;
            j.uid = k;
            j.status = 'done';
            return j;
          });
        v.detailImgStr = v.detailImg;
        v.detailImg =
          v.detailImg &&
          v.detailImg.split(',').map((k) => {
            const j = {};
            j.url = getCosImageUrl() + k;
            j.thumbUrl = j.url;
            j.name = k;
            j.uid = k;
            j.status = 'done';
            return j;
          });
        v.activityDate = [v.startDate, v.endDate];
      });
      this.activitiesData = activitiesData.rows;
    },
    // 格式化日期
    formatDate(e) {
      return e.split('T')[0];
    },
    // 操作活动
    operateActivity(data, operate) {
      if (operate === 'delete') {
        this.delete(data);
        return;
      }
      this.visible = true;
      this.formData = toRaw(data);
      this.fileMainList = this.formData.mainImg;
      this.fileDetailList = this.formData.detailImg;
      const [operateData] = operateList.filter((v) => v.operate === operate);
      this.operateData = toRaw(operateData);
    },
    // 操作活动的时候点击确定按钮
    async handleOk(e) {
      if (!this.fileMainList.length || !this.fileDetailList.length) {
        this.$message.error('请上传图片');
        return;
      }
      this.$refs.ruleForm
        .validate()
        .then(async () => {
          try {
            const uploadMainImageRes = await uploadImage(this.fileMainList);
            const uploadDetailImageRes = await uploadImage(this.fileDetailList);
            const formData = toRaw(this.formData);
            formData.mainImg = uploadMainImageRes || this.formData.mainImgStr;
            formData.detailImg =
              uploadDetailImageRes || this.formData.detailImgStr;
            formData.totalCount = parseInt(formData.totalCount, 10);
            [formData.startDate, formData.endDate] = [...formData.activityDate];
            console.log('handleOk -> formData', formData);
            const createActivity = await api.operateActivity(
              formData,
              this.operateData.operate
            );
            formData.mainImg = [];
            formData.detailImg = [];
            console.log('handleOk -> createActivity', createActivity);

            if (createActivity) {
              this.visible = false;
              this.getActivities();
            }
          } catch (err) {
            console.log('handleOk -> err', err);
          }
        })
        .catch((error) => {
          console.log('handleOk -> error', error);
        });
    },

    async delete(data) {
      console.log(213231);
      const index = this.activitiesData.findIndex((v) => v.id === data.id);
      const res = await api.deleteActivity(data);
      if (res.data === 1) {
        this.activitiesData.splice(index, 1);
        this.$message.success('删除成功');
      } else {
        this.$message.error('删除失败');
      }
      console.log('delete -> res', res);
    },
  },
};
</script>

<script setup>
import UtpForm from '@/components/UtpForm/UtpForm.vue'
import UtpButton from '@/components/UtpButton/UtpButton.vue'
import UtpInput from '@/components/UtpInput/UtpInput.vue'
import UtpFormItem from '@/components/UtpForm/UtpFormItem.vue'
import { ref, reactive } from 'vue'

const formRef = ref()
const model = reactive({
  email: '1111@qq.com',
  password: '',
  comfirmPwd: ''
})
const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }, { type: 'string', required: true, trigger: 'input' }],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 8, max: 16 }],
  comfirmPwd: [{ type: 'string', required: true, trigger: 'blur' }, {
    validator: (rule, value) => {
      return value === model.password
    },
    trigger: 'blur',
    message: '密码不一致'
  }]
}
const submit = async () => {
  let res = await formRef.value.validate()
    .catch((e) => {
      console.log('the error', e)
    })
  if(res) {
    console.log('passed!')
  }
}
const reset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <div>
    <utp-form ref="formRef" :model="model" :rules="rules">
      <utp-form-item label="the email" prop="email">
        <utp-input v-model="model.email"></utp-input>
      </utp-form-item>
      <utp-form-item label="the password" prop="password">
        <template #label="{ label }">
          {{ label }}
        </template>
        <utp-input v-model="model.password"></utp-input>
      </utp-form-item>
      <utp-form-item label="the password" prop="comfirmPwd">
        <utp-input v-model="model.comfirmPwd"></utp-input>
      </utp-form-item>
      <div>
        <utp-button type="primary" @click="submit">Submit</utp-button>
        <utp-button @click="reset">Reset</utp-button>
      </div>
    </utp-form>
    <p>
      form value
    <pre>{{ model }}</pre>
    </p>
  </div>
</template>

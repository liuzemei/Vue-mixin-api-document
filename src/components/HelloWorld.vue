<template>
    <div class="hello">
        <div class="form">
            <div v-show="isFileUpload">
                <transition name="el-zoom-in-top">
                    <div class="form-json" v-if="isFileUpload">
                        <el-upload
                            class="upload"
                            drag
                            action
                            ref="upload"
                            :before-upload="fileUpload"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将json文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                            <div
                                class="el-upload__tip"
                                style="color:#409eff;cursor:pointer;"
                                slot="tip"
                                @click="isFileUpload=false"
                            >或者点击这里输入登录</div>
                        </el-upload>
                        <p>json 文件哪里来？</p>
                        <p>
                            <a target="view_window" href="https://w3c.group/c/1567337919309762">点击这里</a>查看第3条
                        </p>
                    </div>
                </transition>
            </div>
            <template v-show="!isFileUpload">
                <transition name="el-zoom-in-top">
                    <div v-if="!isFileUpload">
                        <el-input placeholder="请输入pin" v-model="keyForm.pin">
                            <template width="200" slot="prepend">pin</template>
                        </el-input>
                        <el-input placeholder="请输入client_id" v-model="keyForm.client_id">
                            <template slot="prepend">client_id</template>
                        </el-input>
                        <el-input placeholder="请输入session_id" v-model="keyForm.session_id">
                            <template slot="prepend">session_id</template>
                        </el-input>
                        <el-input placeholder="请输入pin_token" v-model="keyForm.pin_token">
                            <template slot="prepend">pin_token</template>
                        </el-input>
                        <div style="text-align:left;padding-left:20px;">private_key</div>
                        <el-input
                            type="textarea"
                            placeholder="请输入private_key"
                            v-model="keyForm.private_key"
                            style
                        >
                            <!-- <template slot="prepend">private_key</template> -->
                        </el-input>
                        <el-button @click="submitForm">提交</el-button>
                        <div
                            style="color:#409eff;cursor:pointer;font-size:12px;margin-top:10px;"
                            @click="isFileUpload=true"
                        >返回文件上传</div>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>

<script>
import tools from '../assets/js/tools';
export default {
    name: 'HelloWorld',
    data() {
        return {
            keyForm: {
                pin: '',
                client_id: '',
                session_id: '',
                pin_token:
                    '',
                private_key:
                    ''
            },
            isFileUpload: false
        };
    },
    methods: {
        fileUpload(file) {
            tools.readFile(file).then(res => {
                if (!res) {
                    this.$message('请上传json类型文件');
                    return;
                }
                try {
                    let keyStore = JSON.parse(res);
                    console.log(keyStore);
                    let isCorrectJson = tools.requiredMssage(
                        keyStore,
                        'pin',
                        'client_id',
                        'session_id',
                        'pin_token',
                        'private_key'
                    );
                    if (!isCorrectJson) {
                        this.$message('请上传正确的 json 文件');
                        return;
                    }
                    window._keyStore = keyStore;
                    this.$router.push({ name: 'about', params: keyStore });
                } catch (e) {
                    console.log(e);
                }
            });
            return false;
        },
        submitForm() {
            window._keyStore = this.keyForm;
            console.log(
                this.$router.push({ name: 'about', params: this.keyForm })
            );
        }
    },
    mounted() {}
};
</script>

<style lang="scss">
.hello {
    text-align: center;
    .form {
        margin: 0 auto;
        width: 600px;

        & > div > div {
            margin-bottom: 15px;
            .el-input-group__prepend {
                width: 80px;
            }
            textarea {
                height: 350px;
                resize: none;
            }
        }

        .form-json {
        }
    }
}
</style>
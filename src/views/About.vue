<template>
    <div class="about">
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>用户信息
                        </template>
                        <!-- <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>-->
                        <el-menu-item @click="replaceRequestInfo('get_me')" index="1-1">我</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="main">
                    <el-input
                        placeholder="请输入uri"
                        v-model="requestForm.url"
                        class="input-with-select"
                    >
                        <el-select
                            style="width:100px;"
                            v-model="requestForm.method"
                            slot="prepend"
                            placeholder="请选择"
                        >
                            <el-option label="GET" value="GET"></el-option>
                            <el-option label="POST" value="POST"></el-option>
                        </el-select>
                        <el-button @click="submitRequest" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-main>
        </el-container>
        <button @click="test">test</button>
        <el-upload class="upload" drag action ref="upload" :before-upload="fileUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将json文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>
    </div>
</template>

<script>
import tools from '../assets/js/tools';
export default {
    data() {
        return {
            requestForm: {
                url: '',
                method: 'GET',
                body: ''
            }
        };
    },
    methods: {
        replaceRequestInfo() {},
        submitRequest() {
            this.axios(this.requestForm);
        },
        test() {
            tools.uploadFile();
        },
        fileUpload(file) {
            tools.uploadFile('', file);
        }
    },
    mounted() {
        console.log(this.$route);
    }
};
</script>

<style>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
import Vue from 'vue'
import Vuex from 'vuex'
import createId from '@/lib/createId';
import clone from '@/lib/clone';

Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    recordList:[],
    tagList:[],
    currentTag:undefined,
  }as RootState,
  mutations: {
    fetchTags(state) {
      state.tagList=JSON.parse(window.localStorage.getItem('tagsList') || '[]');
      if(!state.tagList||state.tagList.length===0){
        store.commit('createTag','衣');
        store.commit('createTag','食');
        store.commit('createTag','住');
        store.commit('createTag','行');
      }
    },
    createTag(state,name:string){
      const names= state.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0){
        window.alert('标签名重复了');
        return 'duplicated';
      }
      const id=createId().toString();
      state.tagList.push({id:id,name:name});
      store.commit('saveTags');
    },
    saveTags(state){
      window.localStorage.setItem('tagsList',JSON.stringify(state.tagList));
    },
    findTag(state,id:string){
      state.currentTag = state.tagList.filter(t=>t.id===id)[0];
    },
    updateTag(state,object:{id:string,name:string}){
      const {id,name}=object;
      const idList=state.tagList.map(item=>item.id);
      if(idList.indexOf(id)>=0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state,id:string){
      for(let i=0;i<state.tagList.length;i++){
        if(state.tagList[i].id===id){
          state.tagList.splice(i,1);
          store.commit('saveTags');
          break;
        }
      }
    },

    fetchRecords(state){
      state.recordList=JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList));
    },
    createRecord(state,record:RecordItem){
      const record2:RecordItem=clone(record);
      record.createdAt='0';
      if(record2.createdAt==='0'){
        record2.createdAt=new Date().toISOString().split('T')[0];
      }
      state.recordList.push(record2)
      store.commit('saveRecords');
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store

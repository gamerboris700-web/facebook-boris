import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function App() {
  const [tab, setTab] = useState('feed'); // feed ou chat
  const [posts, setPosts] = useState([
    { id: 1, name: 'Boris Gamer', text: 'Mon app Facebook marche ! 🚀', likes: 2, liked: false, comments: [] },
  ]);
  const [newPost, setNewPost] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Moi', text: 'Salut les gars !' },
    { id: 2, user: 'Alex', text: 'Yo Boris, ton app est propre ! 🔥' },
    { id: 3, user: 'Sara', text: 'Tu as mis les likes ?' },
  ]);
  const [msgText, setMsgText] = useState('');

  const addPost = () => {
    if (!newPost) return;
    setPosts([{ id: Date.now(), name: 'Boris Gamer', text: newPost, likes: 0, liked: false, comments: [] }, ...posts]);
    setNewPost('');
  };
  const like = (id) => setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes-1 : p.likes+1 } : p));
  const sendMsg = () => {
    if (!msgText) return;
    setMessages([...messages, { id: Date.now(), user: 'Moi', text: msgText }]);
    setMsgText('');
  };

  return (
    <View style={s.container}>
      <View style={s.header}><Text style={s.logo}>facebook</Text></View>

      {/* CONTENU */}
      {tab === 'feed' ? (
        <ScrollView>
          <View style={s.createBox}>
            <TextInput placeholder="Quoi de neuf, Boris ?" value={newPost} onChangeText={setNewPost} style={s.inputFlex} />
            <TouchableOpacity onPress={addPost} style={s.postBtn}><Text style={{color:'white'}}>Publier</Text></TouchableOpacity>
          </View>
          {posts.map(p => (
            <View key={p.id} style={s.post}>
              <Text style={s.name}>{p.name}</Text>
              <Text style={s.postText}>{p.text}</Text>
              <View style={s.actions}>
                <TouchableOpacity onPress={() => like(p.id)}><Text style={{color: p.liked ? '#1877f2' : '#65676b', fontWeight: p.liked ? 'bold' : 'normal'}}>👍 {p.likes} J'aime</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Commentaire')}><Text style={{color:'#65676b'}}>💬 Commenter</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Partagé !')}><Text style={{color:'#65676b'}}>↗️ Partager</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{flex:1}}>
          <View style={s.chatHeader}><Text style={s.chatTitle}>Discussions</Text><Text style={s.online}>● 3 en ligne</Text></View>
          <ScrollView style={s.chatList}>
            {messages.map(m => (
              <View key={m.id} style={[s.msg, m.user === 'Moi' ? s.myMsg : s.otherMsg]}>
                <Text style={s.msgUser}>{m.user}</Text>
                <Text>{m.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={s.chatInputBox}>
            <TextInput placeholder="Écris un message..." value={msgText} onChangeText={setMsgText} style={s.chatInput} />
            <TouchableOpacity onPress={sendMsg} style={s.sendBtn}><Text style={{color:'white'}}>➤</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {/* BARRE EN BAS */}
      <View style={s.bottomBar}>
        <TouchableOpacity onPress={() => setTab('feed')} style={s.tab}><Text style={{color: tab==='feed' ? '#1877f2' : '#65676b', fontWeight:'bold'}}>🏠 Fil</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('chat')} style={s.tab}><Text style={{color: tab==='chat' ? '#1877f2' : '#65676b', fontWeight:'bold'}}>💬 Discussions</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  header: { backgroundColor: 'white', paddingTop: 45, paddingBottom: 10, paddingHorizontal: 15 },
  logo: { color: '#1877f2', fontSize: 28, fontWeight: 'bold' },
  createBox: { backgroundColor: 'white', flexDirection: 'row', padding: 10, marginBottom: 8, alignItems: 'center' },
  inputFlex: { flex: 1, backgroundColor: '#f0f2f5', padding: 10, borderRadius: 20, marginRight: 8 },
  postBtn: { backgroundColor: '#1877f2', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  post: { backgroundColor: 'white', marginBottom: 8, padding: 12 },
  name: { fontWeight: 'bold' },
  postText: { marginTop: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, borderTopWidth: 1, borderColor: '#eee', paddingTop: 8 },
  chatHeader: { backgroundColor: 'white', padding: 12, flexDirection: 'row', justifyContent: 'space-between' },
  chatTitle: { fontWeight: 'bold', fontSize: 16 },
  online: { color: 'green', fontSize: 12 },
  chatList: { flex: 1, padding: 10 },
  msg: { padding: 10, borderRadius: 15, marginBottom: 8, maxWidth: '80%' },
  myMsg: { backgroundColor: '#1877f2', alignSelf: 'flex-end' },
  otherMsg: { backgroundColor: 'white', alignSelf: 'flex-start' },
  msgUser: { fontSize: 10, fontWeight: 'bold', marginBottom: 2 },
  chatInputBox: { flexDirection: 'row', backgroundColor: 'white', padding: 10, alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: '#f0f2f5', padding: 10, borderRadius: 20, marginRight: 8 },
  sendBtn: { backgroundColor: '#1877f2', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  bottomBar: { flexDirection: 'row', backgroundColor: 'white', borderTopWidth: 1, borderColor: '#ddd', paddingVertical: 12 },
  tab: { flex: 1, alignItems: 'center' }
});
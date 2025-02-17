import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Array de frases
const phrases = [
  "Esta é uma ferramenta designada para lhe ajudar a conquistar suas metas focado na simplicidade e objetividade.",
  "Mantenha o foco no seu objetivo e avance um passo de cada vez.",
  "Grandes conquistas começam com pequenos passos diários.",
  "A disciplina é a ponte entre metas e realizações.",
  "Transforme sonhos em metas e metas em realizações.",
  "A consistência é o caminho para o sucesso.",
  "Planeje seu trabalho e trabalhe no seu plano.",
  "Acredite em você e vá além das suas expectativas.",
  "A persistência é o caminho para alcançar seus objetivos.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Tenha coragem para começar e determinação para continuar.",
  "Seja a sua melhor versão a cada dia.",
  "Aproveite o processo enquanto trabalha nas suas metas.",
  "Desafios são oportunidades disfarçadas.",
  "Tudo posso naquele que me fortalece. (Filipenses 4:13)",
  "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus. (Isaías 41:10)",
  "Os que esperam no Senhor renovarão as forças. (Isaías 40:31)",
  "A perseverança deve ter ação completa, para que sejais perfeitos e íntegros. (Tiago 1:4)",
  "Pois ainda que caia, não ficará prostrado, porque o Senhor o sustém pela mão. (Salmos 37:24)",
  "Bem-aventurado o homem que suporta com perseverança a provação. (Tiago 1:12)",
  "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. (Provérbios 3:5)",
  "O Senhor é meu pastor, nada me faltará. (Salmos 23:1)",
  "Fortalecei-vos no Senhor e na força do seu poder. (Efésios 6:10)",
  "Jesus jejuou por quarenta dias e quarenta noites no deserto. (Mateus 4:2)",
  "O povo de Israel vagou por quarenta anos no deserto, até encontrar a Terra Prometida. (Números 14:33-34)",
  "Moisés ficou no monte por quarenta dias e quarenta noites, em comunhão com Deus. (Êxodo 24:18)",
  "Os homens de Nínive se arrependeram em quarenta dias, e Deus poupou a cidade. (Jonas 3:4-10)",
  "O Senhor falou a Noé: ‘Depois de quarenta dias e quarenta noites de chuva, a terra será purificada’. (Gênesis 7:12)",
  "Jesus apareceu aos seus discípulos por quarenta dias após a ressurreição, antes de subir ao céu. (Atos 1:3)",
  "Na sua angústia, clamaram ao Senhor, e ele os livrou das suas tribulações. (Salmos 107:6)",
  "O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que confiam nele. (Naum 1:7)",
  "Espera no Senhor, sê forte, e Ele fortalecerá o teu coração. (Salmos 27:14)",
  "Porque pela graça sois salvos, mediante a fé; e isso não vem de vós, é dom de Deus. (Efésios 2:8)",
  "Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo. (Salmos 23:4)",
  "Os que semeiam em lágrimas segarão com alegria. (Salmos 126:5)",
  "Não vos canseis de fazer o bem, pois no tempo próprio colheremos, se não desanimarmos. (Gálatas 6:9)",
  "O Senhor é a minha luz e a minha salvação; a quem temerei? (Salmos 27:1)",
  "Com a paciência, ganhareis as vossas almas. (Lucas 21:19)",
  "Aqueles que perseverarem até o fim serão salvos. (Mateus 24:13)",
  "O Senhor dá força ao seu povo; o Senhor abençoa o seu povo com paz. (Salmos 29:11)",
  "Pois tu, Senhor, és bom e perdoador, e abundante em misericórdia. (Salmos 86:5)",
  "Os justos clamam, e o Senhor os ouve e os livra de todas as suas angústias. (Salmos 34:17)",
  "Fiel é o Senhor, que vos confirmará e guardará do maligno. (2 Tessalonicenses 3:3)",
  "O Senhor abrirá para ti o seu bom tesouro, o céu. (Deuteronômio 28:12)",
  "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal. (Jeremias 29:11)",
  "O Senhor é fiel e não deixará que sejais tentados além das vossas forças. (1 Coríntios 10:13)",
  "Seja a vossa vida isenta de avareza, contentando-vos com o que tendes. (Hebreus 13:5)",
  "Eu é que sei os planos que tenho para vocês, diz o Senhor. (Jeremias 29:11)",
  "O Senhor é a minha força e o meu cântico. (Êxodo 15:2)",
  "Perseverai na oração, velando nela com ação de graças. (Colossenses 4:2)",
  "Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei. (Mateus 11:28)",
  "Porque o Senhor ama o juízo e não desampara os seus santos. (Salmos 37:28)",
  "E não somente isto, mas também nos gloriamos nas tribulações, sabendo que a tribulação produz perseverança. (Romanos 5:3-4)",
  "Sede fortes e corajosos, não temais, nem vos espanteis. (Deuteronômio 31:6)",
  "O que você faz hoje define quem você será amanhã.",
  "Foque no progresso, não na perfeição.",
  "Transforme seus obstáculos em degraus para o sucesso.",
  "A motivação é o que te faz começar, o hábito é o que te faz continuar.",
  "Crie um plano e mantenha-se comprometido com ele.",
  "A jornada de mil milhas começa com um único passo.",
  "Visualize o sucesso e trabalhe para alcançá-lo.",
  "Não espere, faça acontecer.",
  "Cada ação te aproxima do seu objetivo.",
  "Seja consistente nos seus esforços.",
  "A chave do sucesso é a constância no propósito.",
  "Mantenha suas metas à vista e trabalhe para elas todos os dias.",
  "O futuro pertence àqueles que acreditam na beleza dos seus sonhos.",
  "Acredite no processo e confie no seu caminho.",
  "A única limitação é aquela que você impõe a si mesmo.",
  "Aprenda com cada erro e continue a crescer.",
  "O esforço de hoje é o sucesso de amanhã.",
  "Cada conquista começa com a decisão de tentar.",
  "Tudo o que você quer está do outro lado do esforço.",
  "Nunca subestime o poder de uma mente focada.",
  "As dificuldades são oportunidades para o crescimento.",
  "Conquiste uma meta de cada vez.",
  "Mantenha o foco e não desista.",
  "Você é mais forte do que imagina.",
  "O segredo do sucesso é a persistência.",
  "Sonhe grande, comece pequeno e nunca pare."
];


export default function Home() {
  const [displayPhrase, setDisplayPhrase] = useState(phrases[0]);

  // Função para verificar se é a primeira vez que o app é aberto
  const checkFirstTime = async () => {
    try {
      const firstTime = await AsyncStorage.getItem('firstTime');
      if (firstTime === null) {
        // Primeira vez, salva o estado e exibe a primeira frase
        await AsyncStorage.setItem('firstTime', 'false');
        setDisplayPhrase(phrases[0]);
      } else {
        // Não é a primeira vez, exibe uma frase aleatória
        const randomIndex = Math.floor(Math.random() * (phrases.length - 1)) + 1;
        setDisplayPhrase(phrases[randomIndex]);
      }
    } catch (error) {
      console.error('Erro ao acessar o AsyncStorage:', error);
    }
  };

  useEffect(() => {
    checkFirstTime();
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.description}>
        {displayPhrase}
      </Text>
      <Link href={'/(tabs)'} asChild>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="arrow-circle-right" size={40} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  description: {
    fontSize: 20,
    lineHeight:24,
    fontFamily: 'Barlow-Condensed',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:90,
    backgroundColor: '#333',
    justifyContent:'center',
    height:60,
    width:60,
    alignContent:'center',
    borderColor:'#cf4',
    borderWidth:1,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

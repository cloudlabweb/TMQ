import {FlatList, View} from 'react-native';
import React from 'react';
import {SurahHeaderArabic, SurahTextArabic} from '../components/Arabic_comp';

const Arabic = props => {
  const data = props?.route?.params?.data;


  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={data.groups}
          disableVirtualization={true}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <SurahHeaderArabic
                surahNumber={data.surah_number}
                surahName={data.surah_name}
                surahAyats={data.surah_ayats}
                bismillahShareef={data.surahStoryHeading}
              />
            );
          }}
          renderItem={({item}) => {
            return <SurahTextArabic arabicText={item.arabicText} />;
          }}
        />
      </View>
    </>
  );
};

export default Arabic;

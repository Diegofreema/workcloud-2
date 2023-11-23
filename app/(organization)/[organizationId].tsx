import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useGetSingleOrg } from '../../lib/queries';
import { WorkspaceItem } from '../../components/WorkspaceItem';
import { FontAwesome } from '@expo/vector-icons';
import { useDarkMode } from '../../hooks/useDarkMode';
import { AuthHeader } from '../../components/AuthHeader';
import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import { colors } from '../../constants/Colors';
import dateFormat from 'dateformat';
import { EvilIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

type Props = {};
type SubProps = {
  name: any;
  text: any;
  website?: boolean;
};
const OrganizationItems = ({ name, text, website }: SubProps) => {
  const { darkMode } = useDarkMode();

  if (website) {
    return (
      <Pressable
        onPress={() => Linking.openURL('https://' + text)}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
      >
        <EvilIcons
          color={darkMode ? colors.white : colors.textGray}
          name={name}
          size={24}
        />
        <Text style={{ color: colors.buttonBlue }}>{text}</Text>
      </Pressable>
    );
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <EvilIcons
        color={darkMode ? colors.white : colors.textGray}
        name={name}
        size={24}
      />
      <Text style={{ color: darkMode ? colors.white : colors.textGray }}>
        {text}
      </Text>
    </View>
  );
};
const OrganizationDetails = (props: Props) => {
  const { organizationId } = useLocalSearchParams();
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const { data, isFetching, isLoading, isPending, error } =
    useGetSingleOrg(organizationId);

  if (isLoading || isFetching || isPending) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  console.log(data?.orgs[0]);

  const organization = data.orgs[0];

  return (
    <>
      <AuthHeader
        style={{ marginTop: 10, alignItems: 'center' }}
        path="Organization panel"
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 50 }}
              contentFit="cover"
              source={{ uri: organization.image_url }}
            />
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {organization.organization_name}
              </Text>
              <Text>{}</Text>
            </View>
          </View>
          <Button
            onPress={() =>
              router.push(`/(organization)/edit/${organization.id})`)
            }
            textColor="white"
            buttonColor={colors.buttonBlue}
            style={{ borderRadius: 5 }}
          >
            Edit organization
          </Button>
        </View>
        <View
          style={{
            marginTop: 10,
            borderTopColor: darkMode ? colors.white : colors.gray,
            borderTopWidth: 1,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: '400',
              fontSize: 17,
              color: darkMode ? colors.white : colors.black,
            }}
          >
            {organization.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',

                color: darkMode ? colors.white : colors.black,
                textTransform: 'uppercase',
              }}
            >
              {organization.work_days}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: '#CCF2D9',
                }}
              >
                <Text style={{ color: '#00C041' }}>
                  {dateFormat(organization.opening_time, 'hh:mm TT')}
                </Text>
              </View>
              <Text> — </Text>
              <View
                style={{
                  backgroundColor: '#FFD9D9',

                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: '#D61B0C' }}>
                  {dateFormat(organization.closing_time, 'hh:mm TT')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            gap: 10,
            marginTop: 15,
          }}
        >
          <OrganizationItems name="envelope" text={organization.email} />
          <OrganizationItems name="location" text={organization.location} />
          <OrganizationItems name="link" text={organization.website} website />
        </View>
      </ScrollView>
    </>
  );
};

export default OrganizationDetails;

const styles = StyleSheet.create({});

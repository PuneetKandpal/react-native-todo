import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="all"
        options={{
          title: 'All',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pending"
        options={{
          title: 'Pending',
          tabBarIcon: ({ color }) => <MaterialIcons name="radio-button-unchecked" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: 'Completed',
          tabBarIcon: ({ color }) => <MaterialIcons name="radio-button-checked" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

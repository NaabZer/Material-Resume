from rest_framework import serializers
from .models import Resume, Page, Component, SettingsRow
from rest_framework_recursive.fields import RecursiveField


class SettingsRowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SettingsRow
        fields = ['id', 'url', 'setting', 'value', 'resume',
                  'component', 'page']
        extra_kwargs = {'id': {'read_only': False}}


class ComponentSerializer(serializers.HyperlinkedModelSerializer):
    child_components = RecursiveField(many=True)
    settings = SettingsRowSerializer(many=True)

    class Meta:
        model = Component
        fields = ['id', 'url', 'inside_page', 'inside_component',
                  'component_type', 'row', 'col', 'height', 'width',
                  'settings', 'child_components']
        extra_kwargs = {'id': {'read_only': False}}

    def update(self, instance, validated_data):
        children_data = validated_data.pop('child_components')
        settings_data = validated_data.pop('settings')

        for child_data in children_data:
            print('----')
            print(child_data)
            child = Component.objects.get(pk=child_data.get('id'))
            print(child)
            ComponentSerializer().update(child, child_data)

        """
        for setting_data in settings_data:
            setting = SettingsRow.objects.get(pk=setting_data.get('id'))
            SettingsRowSerializer().update(setting, setting_data)
        """

        return super(ComponentSerializer, self).update(instance,
                                                       validated_data)


class PageSerializer(serializers.HyperlinkedModelSerializer):
    child_components = ComponentSerializer(many=True)
    settings = SettingsRowSerializer(many=True)

    class Meta:
        model = Page
        fields = ['id', 'url', 'resume', 'page_num', 'settings',
                  'child_components']
        extra_kwargs = {'id': {'read_only': False}}

    def update(self, instance, validated_data):
        children_data = validated_data.pop('child_components')
        settings_data = validated_data.pop('settings')

        for child_data in children_data:
            print('####')
            print(child_data)
            child = Component.objects.get(pk=child_data.get('id'))
            print(child)
            ComponentSerializer().update(child, child_data)

        """
        for setting_data in settings_data:
            setting = SettingsRow.objects.get(pk=setting_data.get('id'))
            SettingsRowSerializer().update(setting, setting_data)
        """

        return super(PageSerializer, self).update(instance,
                                                  validated_data)


class ResumeSerializer(serializers.HyperlinkedModelSerializer):
    pages = PageSerializer(many=True)
    settings = SettingsRowSerializer(many=True)

    class Meta:
        model = Resume
        fields = ['id', 'url', 'name', 'pages', 'settings']

    def update(self, instance, validated_data):
        print(validated_data)
        pages_data = validated_data.pop('pages')
        settings_data = validated_data.pop('settings')

        for page_data in pages_data:
            page = Page.objects.get(pk=page_data.get('id'))
            PageSerializer().update(page, page_data)

        """
        for setting_data in settings_data:
            setting = SettingsRow.objects.get(pk=setting_data.get('id'))
            SettingsRowSerializer().update(setting, setting_data)
        """

        return super(ResumeSerializer, self).update(instance,
                                                    validated_data)


class ResumeListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'url', 'name']

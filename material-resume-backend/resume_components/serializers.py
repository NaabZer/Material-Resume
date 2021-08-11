from rest_framework import serializers
from .models import Resume, Page, Component, SettingsRow
from rest_framework_recursive.fields import RecursiveField


class SettingsRowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SettingsRow
        fields = ['id', 'url', 'setting', 'value', 'resume',
                  'component', 'page']
        extra_kwargs = {'id': {'read_only': False, 'required': False}}


class ComponentSerializer(serializers.HyperlinkedModelSerializer):
    child_components = RecursiveField(many=True)
    settings = SettingsRowSerializer(many=True)

    class Meta:
        model = Component
        fields = ['id', 'url', 'inside_page', 'inside_component',
                  'component_type', 'row', 'col', 'height', 'width',
                  'settings', 'child_components']
        extra_kwargs = {'id': {'read_only': False, 'required': False}}

    def create(self, validated_data):
        settings_data = validated_data.pop('settings')
        children_data = validated_data.pop('child_components')
        component = Component.objects.create(**validated_data)

        for child_data in children_data:
            if 'id' in child_data:
                child = Component.objects.get(pk=child_data.get('id'))
                child_data['inside_page'] = None
                child_data['inside_component'] = component
                ComponentSerializer().update(child, child_data)
            else:
                child_data['inside_component'] = component
                ComponentSerializer().create(child_data)

        settings_list = []
        for setting_data in settings_data:
            setting = SettingsRow.objects.create(component=component,
                                                 **setting_data)
            settings_list.append(setting)
        component.settings.set(settings_list)

        return component

    def update(self, instance, validated_data):
        children_data = validated_data.pop('child_components')
        settings_data = validated_data.pop('settings')

        for child_data in children_data:
            if 'id' in child_data:
                child = Component.objects.get(pk=child_data.get('id'))
                child_data['inside_page'] = None
                child_data['inside_component'] = instance
                ComponentSerializer().update(child, child_data)
            else:
                Component.objects.create(inside_component=instance,
                                         **child_data)

        for setting_data in settings_data:
            setting = SettingsRow.objects.filter(
                    setting=setting_data.get('setting'),
                    component=instance).first()
            if(setting):
                SettingsRowSerializer().update(setting, setting_data)
            else:
                SettingsRow.objects.create(component=instance,
                                           setting=setting_data.get('setting'),
                                           value=setting_data.get('value'))

        return super(ComponentSerializer, self).update(instance,
                                                       validated_data)


class PageSerializer(serializers.HyperlinkedModelSerializer):
    child_components = ComponentSerializer(many=True)
    settings = SettingsRowSerializer(many=True)

    class Meta:
        model = Page
        fields = ['url', 'id', 'resume', 'page_num', 'settings',
                  'child_components']
        extra_kwargs = {'id': {'read_only': False, 'required': False}}

    def update(self, instance, validated_data):
        children_data = validated_data.pop('child_components')
        settings_data = validated_data.pop('settings')

        for child_data in children_data:
            if 'id' in child_data:
                child = Component.objects.get(pk=child_data.get('id'))
                child_data['inside_page'] = instance
                child_data['inside_component'] = None
                ComponentSerializer().update(child, child_data)
            else:
                child_data['inside_page'] = instance
                ComponentSerializer().create(child_data)

        for setting_data in settings_data:
            setting = SettingsRow.objects.filter(
                    setting=setting_data.get('setting'),
                    page=instance).first()
            if(setting):
                SettingsRowSerializer().update(setting, setting_data)
            else:
                SettingsRow.objects.create(component=instance,
                                           setting=setting_data.get('setting'),
                                           value=setting_data.get('value'))

        return super(PageSerializer, self).update(instance,
                                                  validated_data)


class ResumeSerializer(serializers.HyperlinkedModelSerializer):
    pages = PageSerializer(many=True)
    settings = SettingsRowSerializer(many=True)

    class Meta:
        model = Resume
        fields = ['id', 'url', 'name', 'pages', 'settings']

    def update(self, instance, validated_data):
        pages_data = validated_data.pop('pages')
        settings_data = validated_data.pop('settings')

        for page_data in pages_data:
            page = Page.objects.get(pk=page_data.get('id'))
            page_data['resume'] = instance
            PageSerializer().update(page, page_data)

        for setting_data in settings_data:
            setting = SettingsRow.objects.filter(
                    setting=setting_data.get('setting'),
                    resume=instance).first()
            if(setting):
                SettingsRowSerializer().update(setting, setting_data)
            else:
                SettingsRow.objects.create(component=instance,
                                           setting=setting_data.get('setting'),
                                           value=setting_data.get('value'))

        return super(ResumeSerializer, self).update(instance,
                                                    validated_data)


class ResumeListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'url', 'name']

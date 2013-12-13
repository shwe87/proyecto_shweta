from django.conf.urls import patterns, include, url
from django.contrib import auth
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
import syncShare
from django.contrib.staticfiles.views import serve as serve_static
from django.views.decorators.cache import never_cache

admin.autodiscover()

urlpatterns = patterns('',
        (r'^login/$','mysite.views.main'),
	(r'^browserid/', include('django_browserid.urls')),
	(r'^change/device/name/$','mysite.views.changeDeviceName'),
	(r'^add/all/bookmarks/$','mysite.views.addNewBookmarks'),
	(r'^add/all/history/$','mysite.views.addNewHistory'),
	(r'^add/all/tabs','mysite.views.addNewTabs'),
	(r'^read/all/bookmarks/$','mysite.views.readAllBookmarks'),
	(r'^read/all/history/$','mysite.views.readAllHistory'),
	(r'^read/all/tabs/$','mysite.views.readAllTabs'),
	(r'^save/(?P<element>[\w]+)/$','mysite.views.save'),
	(r'^read/(?P<element>[\w]+)/$','mysite.views.read'),
	(r'^add/$','mysite.views.add'),
	(r'^delete/sync/$','mysite.views.deleteSync'),
	(r'^delete/share/from/content/$','mysite.views.deleteShareFromContent'),
	#(r'^delete/share/from/user/$','mysite.views.deleteShareFromUser'),
	(r'^delete/from/group/$','mysite.views.deleteFromGroup'),
	(r'^share/$','mysite.views.share'),
	(r'^view/share/$','mysite.views.viewShared'),
	#(r'^save/bookmarks/','browseridTest.views.saveBookmarks'),
	#(r'^save/history','browseridTest.views.saveHistory'),
	(r'^$', 'mysite.views.welcome'),
	(r'^static/(?P<path>.*)$', never_cache(serve_static)),
	
	
    # Examples:
    # url(r'^$', 'browseridTest.views.home', name='home'),
    # url(r'^browseridTest/', include('browseridTest.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)

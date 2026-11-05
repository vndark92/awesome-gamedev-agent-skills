package vn.anhoa.academy;
import android.app.*;
import android.os.*;
import android.webkit.*;
import android.net.Uri;
import android.content.Intent;
import android.graphics.Color;
import android.view.*;
import android.widget.*;
import androidx.webkit.WebViewAssetLoader;
import java.io.*;
public class MainActivity extends Activity {
 private WebView web; private FrameLayout root; private View custom; private WebChromeClient.CustomViewCallback fullCallback; private String exportName;
 @Override public void onCreate(Bundle saved) {
  super.onCreate(saved);
  root=new FrameLayout(this); root.setBackgroundColor(Color.rgb(17,40,45)); setContentView(root);
  root.setOnApplyWindowInsetsListener((v,insets)->{v.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());return insets;});
  web=new WebView(this);root.addView(web,new FrameLayout.LayoutParams(-1,-1));
  web.setBackgroundColor(Color.rgb(17,40,45));
  web.getSettings().setJavaScriptEnabled(true);web.getSettings().setDomStorageEnabled(true);
  web.getSettings().setAllowFileAccess(false);web.getSettings().setAllowContentAccess(false);
  web.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  WebViewAssetLoader loader=new WebViewAssetLoader.Builder().addPathHandler("/assets/",new WebViewAssetLoader.AssetsPathHandler(this)).build();
  web.setWebViewClient(new WebViewClient(){
   @Override public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){return loader.shouldInterceptRequest(r.getUrl());}
   @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){Uri u=r.getUrl();if("https".equals(u.getScheme())&&"appassets.androidplatform.net".equals(u.getHost()))return false;if("https".equals(u.getScheme())){try{startActivity(new Intent(Intent.ACTION_VIEW,u));}catch(android.content.ActivityNotFoundException ignored){Toast.makeText(MainActivity.this,"Không tìm thấy trình duyệt",Toast.LENGTH_SHORT).show();}}return true;}
   @Override public void onReceivedError(WebView v,WebResourceRequest r,WebResourceError e){if(r.isForMainFrame())new AlertDialog.Builder(MainActivity.this).setTitle("Chưa mở được học viện").setMessage("Hãy thử tải lại. Tiến độ đã lưu vẫn được giữ.").setPositiveButton("Tải lại",(d,w)->web.loadUrl("https://appassets.androidplatform.net/assets/game/academy.html")).setNegativeButton("Đóng",(d,w)->finish()).show();}
  });
  web.setWebChromeClient(new WebChromeClient(){
   @Override public void onShowCustomView(View view,CustomViewCallback callback){if(custom!=null){callback.onCustomViewHidden();return;}custom=view;fullCallback=callback;root.addView(view,new FrameLayout.LayoutParams(-1,-1));web.setVisibility(View.GONE);getWindow().getDecorView().setSystemUiVisibility(5894);}
   @Override public void onHideCustomView(){leaveFullscreen();}
  });
  web.setDownloadListener((url,agent,disposition,mime,length)->{Uri u=Uri.parse(url);String file=u.getLastPathSegment();if(!"appassets.androidplatform.net".equals(u.getHost())||!("question-bank.json".equals(file)||"question-bank.csv".equals(file)))return;exportName=file;Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType(file.endsWith("json")?"application/json":"text/csv").putExtra(Intent.EXTRA_TITLE,file);try{startActivityForResult(i,10);}catch(android.content.ActivityNotFoundException e){Toast.makeText(this,"Thiết bị chưa có trình lưu tệp",Toast.LENGTH_SHORT).show();}});
  if(saved!=null)exportName=saved.getString("exportName");
  web.loadUrl("https://appassets.androidplatform.net/assets/game/academy.html");
 }
 private void leaveFullscreen(){if(custom==null)return;root.removeView(custom);custom=null;web.setVisibility(View.VISIBLE);getWindow().getDecorView().setSystemUiVisibility(0);if(fullCallback!=null){fullCallback.onCustomViewHidden();fullCallback=null;}}
 @Override protected void onActivityResult(int request,int result,Intent data){super.onActivityResult(request,result,data);if(request==10&&result==RESULT_OK&&data!=null&&exportName!=null){try(InputStream in=getAssets().open("game/"+exportName);OutputStream out=getContentResolver().openOutputStream(data.getData())){byte[] buf=new byte[8192];int n;while((n=in.read(buf))!=-1)out.write(buf,0,n);Toast.makeText(this,"Đã lưu ngân hàng câu hỏi",Toast.LENGTH_SHORT).show();}catch(Exception e){Toast.makeText(this,"Chưa lưu được tệp. Hãy thử lại.",Toast.LENGTH_LONG).show();}}}
 @Override protected void onSaveInstanceState(Bundle out){out.putString("exportName",exportName);super.onSaveInstanceState(out);}
 @Override protected void onPause(){web.onPause();super.onPause();}
 @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();}
 @Override protected void onDestroy(){web.destroy();super.onDestroy();}
 @Override public void onBackPressed(){if(custom!=null){leaveFullscreen();return;}if(web.canGoBack()){web.goBack();return;}web.evaluateJavascript("typeof window.academyBack === 'function' && window.academyBack()",handled->{if(!"true".equals(handled))new AlertDialog.Builder(this).setTitle("Nghỉ một chút nhé?").setMessage("Mảnh ghép đã lưu được giữ lại. Trận đang chơi sẽ bắt đầu lại khi mở app.").setPositiveButton("Thoát",(d,w)->finish()).setNegativeButton("Chơi tiếp",null).show();});}
}

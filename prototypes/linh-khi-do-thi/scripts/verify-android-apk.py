"""Verify installed entry point exists in DEX, not just in the manifest.
Usage: python verify-android-apk.py APK SDK_BUILD_TOOLS_DIRECTORY
"""
import json, pathlib, re, shutil, subprocess, sys, tempfile, zipfile
apk=pathlib.Path(sys.argv[1]).resolve()
build_tools=pathlib.Path(sys.argv[2]).resolve()
suffix='.exe' if sys.platform=='win32' else ''
def run(tool,*args):
    return subprocess.check_output([str(build_tools/(tool+suffix)),*map(str,args)],text=True,encoding='utf-8',errors='replace')
# Some Windows Android tools cannot open Unicode paths.
with tempfile.TemporaryDirectory(prefix='anhoa-apk-') as folder:
    staged=pathlib.Path(folder)/'app.apk'
    shutil.copyfile(apk,staged)
    badging=run('aapt','dump','badging',staged)
match=re.search(r"launchable-activity: name='([^']+)'",badging)
assert match, 'APK has no launcher activity'
activity=match.group(1)
expected='L'+activity.replace('.','/')+';'
classes=set()
with zipfile.ZipFile(apk) as archive, tempfile.TemporaryDirectory(prefix='anhoa-dex-') as folder:
    for name in archive.namelist():
        if re.fullmatch(r'classes[0-9]*\.dex',name):
            dex=pathlib.Path(folder)/name
            dex.write_bytes(archive.read(name))
            classes.update(re.findall(r"Class descriptor\s*:\s*'([^']+)'",run('dexdump',dex)))
    assert expected in classes, f'MISSING LAUNCHER CLASS: {expected}'
    assert 'Landroidx/webkit/WebViewAssetLoader;' in classes, 'Missing offline asset loader'
    assert len(json.loads(archive.read('assets/game/question-bank.json'))['questions'])==300
    source=pathlib.Path(__file__).resolve().parent.parent/'dist'
    for asset in source.rglob('*'):
        if asset.is_file():
            name='assets/game/'+asset.relative_to(source).as_posix()
            assert archive.read(name)==asset.read_bytes(), f'Packaged asset mismatch: {name}'
print('PASS: launcher class defined in DEX:',activity)
print('PASS: offline loader, 300 questions, every packaged game asset matches source')
